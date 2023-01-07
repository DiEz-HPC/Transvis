<?php

namespace App\Controller;

use Bolt\Controller\TwigAwareController;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CandidatureRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Bolt\Controller\Backend\BackendZoneInterface;
use Nette\Utils\FileSystem;
use Symfony\Component\HttpFoundation\RedirectResponse;


class CandidaturesController extends TwigAwareController implements BackendZoneInterface
{


    public function __construct(
        private CandidatureRepository $repository,
        private EntityManagerInterface   $entityManager,
    ) {
    }

    #[Route("candidatures/", name: "app_candidatures")]
    public function viewCandidature(): Response
    {
        $candidatures = $this->repository->paginate(1, 10);
        $nbPages = $this->repository->getNbPages(10);
        return $this->render(
            'adminCandidatures.html.twig',
            [
                'candidatures' => $candidatures,
                'nbPages' => $nbPages,
            ]
        );
    }

    #[Route("candidatures/{id}", name: "app_candidatures_paginate")]
    public function viewPaginate(?Int $id = 1): Response
    {
        $candidatures = $this->repository->paginate($id, 10);
        return $this->render(
            'partials/_adminCandidatures.twig',
            [
                'candidatures' => $candidatures,

            ]
        );
    }


    #[Route("candidatures/delete/{id}", name: "app_candidatures_delete")]
    public function deleteMessage(int $id): RedirectResponse
    {
        $content = $this->repository->find($id);
        if ($content) {
            FileSystem::delete($this->getFile($content->getFilename()));
            $this->entityManager->remove($content);
            $this->entityManager->flush();
            $this->addFlash('success', 'Candidature supprimée');
        } else {
            $this->addFlash('error', 'Candidature introuvable');
        }
        return $this->redirectToRoute('app_candidatures');
    }

    #[Route("candidatures/download/{id}", name: "app_candidatures_download")]
    public function downloadFile(int $id): Response
    {
        $content = $this->repository->find($id);
        $filename = $content->getFilename();
        $file = $this->getFile($filename);
        $reponse = new Response();
        $reponse->headers->set('Content-Type', 'application/pdf');
        $reponse->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');
        $reponse->headers->set('Content-Length', filesize($file));
        $reponse->sendHeaders();
        $reponse->setContent(file_get_contents($file));
        return $reponse;
    }

    private function getFile($filename)
    {
        $path = $this->getParameter('upload_directory');
        return $path . '/' . $filename;
    }
}
