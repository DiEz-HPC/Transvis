<?php

namespace App\Controller;

use Bolt\Menu\ExtensionBackendMenuInterface;
use Knp\Menu\MenuItem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class AdminCustomMenu implements ExtensionBackendMenuInterface
{

    public function __construct(
        private UrlGeneratorInterface $urlGenerator
    )
    {
    }

    public function addItems(MenuItem $menu): void
    {
        $menu->addChild('Message de contact', [
            'uri' => $this->urlGenerator->generate('app_contact_message'),
            'extras' => [
                'icon' => 'fa-envelope'
            ]
        ]);


    }
}
