<?php

namespace App\Controller;

use App\Repository\CandidatureRepository;
use Bolt\Controller\Backend\BackendZoneInterface;
use Bolt\Controller\TwigAwareController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class CandidaturesController extends TwigAwareController implements BackendZoneInterface
{


    public function __construct(
        private CandidatureRepository $repository,
        private EntityManagerInterface   $entityManager,
    )
    {
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
            $this->entityManager->remove($content);
            $this->entityManager->flush();
            $this->addFlash('success', 'Candidature supprimée');
        } else {
            $this->addFlash('error', 'Candidature introuvable');
        }
        return $this->redirectToRoute('app_candidatures');
    }
}
