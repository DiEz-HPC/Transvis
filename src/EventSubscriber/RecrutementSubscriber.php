<?php

namespace App\EventSubscriber;

use App\Entity\Candidature;
use Symfony\Component\Form\FormEvents;
use Bolt\BoltForms\Event\BoltFormsEvent;
use Doctrine\ORM\EntityManagerInterface;
use Bolt\BoltForms\Event\BoltFormsEvents;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class RecrutementSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private EntityManagerInterface $em,
        private SessionInterface $session
    ) {
    }

    public function onBoltformsPreSubmit(BoltFormsEvent $event): void
    {
        $data = $event->getData();
        $mimeType = $data['cv']->getMimeType();
        $filename = uniqid() . '-' . $data['lastname'] . '-' . $data['firstname'] . '.' . $data['cv']->guessExtension();
        $data['cv']->move('files/recrutements/cv', $filename);
        
        $data['cv'] = new UploadedFile('files/recrutements/cv/' . $filename, $filename, $mimeType);
        $this->session->set('filename', $filename);
        $event->setData($data);
    }

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
            } else {
                $this->session->getFlashBag()->add('error', 'Vous avez déjà envoyé une candidature pour ce poste.');
            }
        }
        // ...
    }


    public static function getSubscribedEvents(): array
    {
        return [
            BoltFormsEvents::PRE_SUBMIT => 'onBoltformsPreSubmit',
            BoltFormsEvents::SUBMIT => 'onBoltformsSubmit',
        ];
    }
}
