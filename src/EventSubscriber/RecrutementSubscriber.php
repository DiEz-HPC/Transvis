<?php

namespace App\EventSubscriber;

use App\Entity\Candidature;
use Bolt\BoltForms\Event\BoltFormsEvent;
use Bolt\BoltForms\Event\BoltFormsEvents;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class RecrutementSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private EntityManagerInterface $em,
        private SessionInterface $session
    )
    {}

    public function onBoltformsSubmit(BoltFormsEvent $event): void
    {
        if ($event->getEvent()->getForm()->getName() == 'recrutement') {
            $data = $event->getData();

            $candidatures = $this->em->getRepository(Candidature::class)->findBy([
                'job' => $data['job'],
                'email' => $data['email'],
            ]);

            if (!$candidatures) {
                $candidature = new Candidature();
                $candidature->setLastname($data['lastname']);
                $candidature->setFirstname($data['firstname']);
                $candidature->setEmail($data['email']);
                $candidature->setMotivation($data['motivation']);
                $candidature->setFilename($data['cv']->getClientOriginalName());
                $candidature->setJob($data['job']);
                $this->em->persist($candidature);
                $this->em->flush();
                $this->session->getFlashBag()->add('success', 'Votre candidature a bien été envoyée.');
            }else{
                $this->session->getFlashBag()->add('error', 'Vous avez déjà envoyé une candidature pour ce poste.');
            }
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
