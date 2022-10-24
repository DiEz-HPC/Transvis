<?php

namespace App;

use Bolt\Menu\ExtensionBackendMenuInterface;
use Knp\Menu\MenuItem;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class AdminCustomMenu implements ExtensionBackendMenuInterface
{
    /** @var UrlGeneratorInterface */
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
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