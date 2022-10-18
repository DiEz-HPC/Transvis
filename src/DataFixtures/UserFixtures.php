<?php

namespace App\DataFixtures;

use Bolt\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserFixtures extends Fixture
{
    const ROLES =  [
        'ROLE_DEVELOPER',
        'ROLE_ADMIN',
        'ROLE_USER',
        'ROLE_NOS_REALISATIONS',
        'ROLE_RECRUTEMENT',
        'ROLE_NOS_VALEURS',
        'ROLE_NOS_SAVOIR_FAIRE',
        'ROLE_NOS_EQUIPES',
        'ROLE_PAGE_CONTACT',
        'ROLE_VOS_OPTIONS',
        'ROLE_ACCUEIL',
    ];
    public function load(ObjectManager $manager): void
    {
        foreach (self::ROLES as $role) {
            $user = new User();
            $user->setUsername($role);
            $user->setDisplayName($role);
            $user->setEmail($role . '@example.com');
            $user->setRoles([$role]);
            $user->setPassword('password');
            $manager->persist($user);
        }
        $manager->flush();
    }
}
