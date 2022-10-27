<?php

namespace App;

use App\Repository\ContactMessageRepository;
use Bolt\Repository\ContentRepository;
use Bolt\Controller\TwigAwareController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Bolt\Controller\Backend\BackendZoneInterface;


class ContactMessageController extends TwigAwareController implements BackendZoneInterface
{

    private ContactMessageRepository $repository;
    public function __construct(ContactMessageRepository $repository, EntityManagerInterface $entityManager)
    {
        $this->repository = $repository;
        $this->entityManager = $entityManager;
    }

    #[Route("contact-message/", name: "app_contact_message")]
    public function viewMessage(): Response
    {
        $contactMessages = $this->repository->findAll();
        return $this->render(
            'adminContactMessage.html.twig',
            [
               'contactMessages' => $contactMessages,
            ]
        );
    }

    #[Route("contact-message/delete/{id}", name: "app_contact_message_delete")]
    public function deleteMessage(int $id)
    {
        $content = $this->repository->findOneBy($id);
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
