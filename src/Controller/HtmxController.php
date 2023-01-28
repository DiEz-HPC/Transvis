<?php

namespace App\Controller;

use Bolt\Repository\ContentRepository;
use Bolt\Controller\TwigAwareController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route("/htmx", name: "htmx_")]
class HtmxController extends TwigAwareController
{


    public function __construct(
        private ContentRepository $repository,
    ) {
    }

    #[Route("/realisation/{id}", name: "")]
    public function viewRealisation(int $id): Response
    {
        $realisation = $this->repository->find($id);
      
            return $this->render(
                '_videoModalHtmx.twig',
                [
                    'record' => $realisation,
                ]
            );
       
    }

}
