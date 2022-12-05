<?php


namespace App\EventSubscriber;

use Bolt\Event\ContentEvent;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class DuplicateContentSubscriber implements EventSubscriberInterface
{
    private $request;
    public function __construct(RequestStack $request)
    {
     $this->request = $request;   
    }

    public function onDuplicate()
    {
        $request = $this->request->getCurrentRequest();
        return $request->attributes->set('contentType', $request->attributes->all()['content']->getContenttype());
    }


    public static function getSubscribedEvents()
    {
        return [
            ContentEvent::ON_DUPLICATE => 'onDuplicate',
        ];
    }
}
