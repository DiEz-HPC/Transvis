<?php

namespace App\Twig;

use DOMDocument;
use Twig\Markup;
use Twig\TwigFunction;
use Bolt\Entity\Taxonomy;
use Twig\Extension\AbstractExtension;
use Doctrine\ORM\EntityManagerInterface;

class SuperpositionHandlerExtension extends AbstractExtension
{


    public function __construct(private $publicFolder)
    {
        $this->publicFolder = $publicFolder;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('superposition', [$this, 'superposition']),
        ];
    }

    public function superposition(Markup $content): Markup
    {
        $dom = new DOMDocument;
        @$dom->loadHTML('<?xml encoding="utf-8"?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $superposition = $dom->getElementsByTagName('figure');

        foreach ($superposition as $superposition) {
            $img = $dom->createElement('img');
            $img->setAttribute('src', '/theme/transvis/images/savoirs-faire/bloc-contour.png');
            $img->setAttribute('alt', 'image de contour');
            $img->setAttribute('id', 'image-back');
            $superposition->firstChild->setAttribute('class', 'w-0');

            // On ajoute l'image avant le premier enfant de la balise figure
            $superposition->insertBefore($img, $superposition->firstChild);
        }
        $message_encoded = mb_convert_encoding($dom->saveHTML(), 'HTML-ENTITIES', 'UTF-8');
        return new Markup($message_encoded, 'UTF-8');
    }
}
