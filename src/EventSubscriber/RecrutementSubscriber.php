<?php

namespace App\EventSubscriber;

use App\Entity\Candidature;
use Bolt\BoltForms\Event\BoltFormsEvent;
use Bolt\BoltForms\Event\BoltFormsEvents;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class RecrutementSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private EntityManagerInterface $em
    )
    {}

    public function onBoltformsSubmit(BoltFormsEvent $event): void
    {
        if ($event->getEvent()->getForm()->getName() == 'recrutement') {
            $data = $event->getData();
            $contactMessage = new Candidature();
            $contactMessage->setLastname($data['lastname']);
            $contactMessage->setFirstname($data['firstname']);
            $contactMessage->setEmail($data['email']);
            $contactMessage->setMotivation($data['motivation']);
            $contactMessage->setFilename($data['cv']->getClientOriginalName());
            $this->em->persist($contactMessage);
            $this->em->flush();
        }
        // ...
    }

    public static function getSubscribedEvents(): array
    {
        return [
            BoltFormsEvents::SUBMIT => 'onBoltformsSubmit',
        ];
    }
}
