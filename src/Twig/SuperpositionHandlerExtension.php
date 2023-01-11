<?php

namespace App\Twig;

use DOMDocument;
use Twig\Markup;
use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;


class SuperpositionHandlerExtension extends AbstractExtension
{

    public function getFunctions(): array
    {
        return [
            new TwigFunction('superposition', [$this, 'superposition']),
        ];
    }

    public function superposition(Markup|string $content): Markup
    {
        if (!$content instanceof Markup) {
            $content = new Markup($content, 'UTF-8');
        }

        $dom = new DOMDocument();
        @$dom->loadHTML('<?xml encoding="utf-8"?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        $superposition = $dom->getElementsByTagName('figure');

        foreach ($superposition as $superposition) {
            $img = $dom->createElement('img');
            $img->setAttribute('src', '/theme/transvis/images/savoirs-faire/bloc-contour.png.webp');
            $img->setAttribute('alt', 'image de contour');
            $img->setAttribute('id', 'image-back');

            // On ajoute l'image avant le premier enfant de la balise figure
            $superposition->insertBefore($img, $superposition->firstChild);
        }
        $message_encoded = mb_convert_encoding($dom->saveHTML(), 'HTML-ENTITIES', 'UTF-8');
        return new Markup($message_encoded, 'UTF-8');

    }

}
