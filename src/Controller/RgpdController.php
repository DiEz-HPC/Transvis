<?php

namespace App\Controller;

use Bolt\Controller\TwigAwareController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RgpdController extends TwigAwareController
{
    #[Route('/rgpd', name: 'app_rgpd')]
    public function index(): Response
    {
        return $this->render('partials/_politique_confidentialité.twig', [
            'controller_name' => 'RgpdController',
        ]);
    }
}
