<?php

namespace App\DataFixtures;

use App\Entity\ContactMessage;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class ContactMessageFixtures extends Fixture
{   
    const AMOUNT = 20;
    public function load(ObjectManager $manager): void
    {
       
        $contactMessage = new ContactMessage();
        for ($i = 0; $i < self::AMOUNT; $i++) {
            $contactMessage->setName('name' . $i);
            $contactMessage->setFirstname('firstname' . $i);
            $contactMessage->setCompanyName('companyName' . $i);
            $contactMessage->setMail('mail' . $i);
            $contactMessage->setMessage('message' . $i);
            $manager->persist($contactMessage);
        }

        $manager->flush();
    }
}
