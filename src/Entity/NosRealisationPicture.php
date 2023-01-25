<?php

namespace App\Entity;

use App\Repository\NosRealisationPictureRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NosRealisationPictureRepository::class)]
class NosRealisationPicture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private int $realisationId;

    #[ORM\Column]
    private ?string $picturePath;
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRealisationId(): int
    {
        return $this->realisationId;
    }

    public function setRealisationId(int $realisationId): self
    {
        $this->realisationId = $realisationId;

        return $this;
    }

    public function getPicturePath(): string
    {
        return $this->picturePath;
    }

    public function setPicturePath(string $picturePath): self
    {
        $this->picturePath = $picturePath;

        return $this;
    }


}
