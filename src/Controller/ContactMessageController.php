<?php

namespace App\Controller;

use App\Repository\ContactMessageRepository;
use Bolt\Controller\Backend\BackendZoneInterface;
use Bolt\Controller\TwigAwareController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class ContactMessageController extends TwigAwareController implements BackendZoneInterface
{


    public function __construct(
        private ContactMessageRepository $repository,
        private EntityManagerInterface   $entityManager,
    )
    {
    }

    #[Route("contact-message/", name: "app_contact_message")]
    public function viewMessage(): Response
    {
        $contactMessages = $this->repository->paginate(1, 10);
        $nbPages = $this->repository->getNbPages(10);  
        return $this->render(
            'adminContactMessage.html.twig',
            [
                'contactMessages' => $contactMessages,
                'nbPages' => $nbPages,
            ]
        );
    }

    #[Route("contact-message-paginate/{id}", name: "app_contact_message_paginate")]
    public function viewPaginate(?Int $id = 1): Response
    {
        $contactMessages = $this->repository->paginate($id, 10);
        return $this->render(
            'partials/_adminContactMessage.twig',
            [
                'contactMessages' => $contactMessages,

            ]
        );
        
    }


    #[Route("contact-message/delete/{id}", name: "app_contact_message_delete")]
    public function deleteMessage(int $id): RedirectResponse
    {
        $content = $this->repository->find($id);
        if ($content) {
            $this->entityManager->remove($content);
            $this->entityManager->flush();
            $this->addFlash('success', 'Message supprimé');
        } else {
            $this->addFlash('error', 'Message introuvable');
        }
        return $this->redirectToRoute('app_contact_message');
    }
}
