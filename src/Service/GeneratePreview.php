<?php

namespace App\Service;

use App\Entity\NosRealisationPicture;
use Bolt\Entity\Content;
use FFMpeg;
use Doctrine\ORM\EntityManagerInterface;

class GeneratePreview
{

    public function __construct(private string $projectDir, private string $publicFolder, private EntityManagerInterface $em )
    {
        
    }

    public function generatePreview(Content $content)
    {
        // On initialise la librairie FFMpeg
        $ffmpeg = FFMpeg\FFMpeg::create();

        $publicPath = $this->projectDir . '/' . $this->publicFolder;
        $contentTypePath = $publicPath . '/files/';
        $pictureName = 'realisation' . uniqid();

        // On vérifie si une video est présente
        $videoContent = $content->getFieldValue('video');
        if($videoContent == null || $videoContent['filename'] == ""){
            return;
        }

        // On récupère le temps de la preview
        $previewTime = $content->getFieldValue('videoTime');
        if($previewTime == null || $previewTime == ""){
            $previewTime = 0;
        }
        
        // On génère la preview
        $video = $ffmpeg->open($publicPath . $videoContent['path']);
        $frame = $video->frame(FFMpeg\Coordinate\TimeCode::fromSeconds($previewTime));
        $frame->save($contentTypePath . $pictureName . '.jpg');

        // On enregistre la preview
        $this->createMedia($content->getId(), '/files/' .$pictureName . '.jpg');
        
    }

    private function createMedia(int $contentId, string $path)
    {
        // On vérifie si on a deja une entré pour cette realisation
        $media = $this->em->getRepository(NosRealisationPicture::class)->findOneBy(['realisationId' => $contentId]);

        // Si on a pas d'entré on en crée une
        if($media == null){
            $media = new NosRealisationPicture();
        }      
        $media->setRealisationId($contentId);
        $media->setPicturePath($path);

        $this->em->persist($media);
        $this->em->flush();

    }
}
