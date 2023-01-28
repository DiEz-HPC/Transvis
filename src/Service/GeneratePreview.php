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
        $ffmpeg = FFMpeg\FFMpeg::create(array(
            'ffmpeg.binaries'  => $this->projectDir . '/ffmpeg/ffmpeg',
            'ffprobe.binaries' => $this->projectDir . '/ffmpeg/ffprobe',
            'timeout'          => 3600, // The timeout for the underlying process
            'ffmpeg.threads'   => 1,   // The number of threads that FFMpeg should use
        ));

        $publicPath = $this->projectDir . '/' . $this->publicFolder;
        $contentTypePath = $publicPath . '/files/';
        $pictureName = 'realisation' . uniqid();

        // On vérifie si une video est présente
        $videoContent = $content->getFieldValue('video');
        if($videoContent == null || $videoContent['filename'] == ""){
            return 'La réalisation : ' . $content->getId() . ' n\'a pas de video';
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
        if($this->createMedia($content->getId(), '/files/' .$pictureName . '.jpg')){
            return 'La réalisation : ' . $content->getId() . ' a bien été généré';
        }
        
    }

    private function createMedia(int $contentId, string $path)
    {
        // On vérifie si on a deja une entré pour cette realisation
        $media = $this->em->getRepository(NosRealisationPicture::class)->findOneBy(['realisationId' => $contentId]);

        // Si on a pas d'entré on en crée une
        if($media == null){
            $media = new NosRealisationPicture();
        }else {
           $this->deletePicture($media->getPicturePath());
        }      
        $media->setRealisationId($contentId);
        $media->setPicturePath($path);

        $this->em->persist($media);
        $this->em->flush();

        return true;
    }

    private function deletePicture(string $path) {
        $file = $this->projectDir . '/' . $this->publicFolder . $path;

        if(file_exists($file)){
            unlink($file);
        }
    }
}
