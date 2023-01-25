<?php


namespace App\EventSubscriber;

use Bolt\Event\ContentEvent;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use App\Service\GeneratePreview;

class RealisationSubscriber implements EventSubscriberInterface
{

    public function __construct(private GeneratePreview $generatePreview)
    {
   
    }

    public function generatePreview(ContentEvent $event)
    {
        // On vérifie que le contenu est bien de type nos-realisations
        $content = $event->getContent();
        if ($content->getContentType() != 'nos-realisations') {
            return;
        }
        // On génère la preview
        $this->generatePreview->generatePreview($content);
    }


    public static function getSubscribedEvents()
    {
        return [
            ContentEvent::PRE_SAVE => ['generatePreview'],
        ];
    }
}
