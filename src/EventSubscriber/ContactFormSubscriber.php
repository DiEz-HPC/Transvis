<?php


namespace App\EventSubscriber;

use App\Entity\ContactMessage;
use Bolt\BoltForms\Event\BoltFormsEvent;
use Bolt\BoltForms\Event\BoltFormsEvents;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ContactFormSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function onBoltFormsSubmit(BoltFormsEvent $event)
    {
        if($event->getEvent()->getForm()->getName() == 'contact'){
        $data = $event->getData();
        $contactMessage = new ContactMessage();

        $contactMessage->setName($data['name']);
        $contactMessage->setFirstname($data['firstname']);
        $contactMessage->setCompanyName($data['companyName']);
        $contactMessage->setMail($data['email']);
        $contactMessage->setMessage($data['message']);
        
        $this->em->persist($contactMessage);
        $this->em->flush();
        }
        // Do something with the data
    }


    public static function getSubscribedEvents()
    {
        return [
            BoltFormsEvents::SUBMIT => 'onBoltFormsSubmit',
        ];
    }
}