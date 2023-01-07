<?php

namespace App\Controller;

use Bolt\Menu\ExtensionBackendMenuInterface;
use Knp\Menu\MenuItem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Security;
class AdminCustomMenu implements ExtensionBackendMenuInterface
{

    public function __construct(
        private UrlGeneratorInterface $urlGenerator,
        private Security $security
    ) {
    }

    public function addItems(MenuItem $menu): void
    {
        // On vérifie le role de l'utilisateur
        if ($this->security->isGranted('ROLE_PAGE_CONTACT')) {
            $menu->addChild('Message de contact', [
                'uri' => $this->urlGenerator->generate('app_contact_message'),
                'extras' => [
                    'icon' => 'fa-envelope'
                ]
            ]);
        }

        if ($this->security->isGranted('ROLE_RECRUTEMENT')) {
            $menu->addChild('Candidatures', [
                'uri' => $this->urlGenerator->generate('app_candidatures'),
                'extras' => [
                    'icon' => 'fa-file-invoice'
                ]
            ]);
        }
    }
}
