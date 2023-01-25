<?php

namespace App\Twig;


use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\NosRealisationPictureRepository;



class NosRealisationPreviewExtension extends AbstractExtension
{
    public function __construct(private NosRealisationPictureRepository $repo)
    {
    }

    public function getFunctions(): array
    {
        return [
            new TwigFunction('loadpreview', [$this, 'loadPreview']),
        ];
    }

    public function loadpreview(int $id)
    {
      // On récupere l'entité de la realisation
        $picture = $this->repo->findOneBy(['realisationId' => $id]);
        if($picture != null){
            return $picture->getPicturePath();
        }
        return null;
    }

}
