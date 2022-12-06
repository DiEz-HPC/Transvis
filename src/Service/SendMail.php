<?php

namespace App\Service;


use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class SendMail
{

    public function __construct(private MailerInterface $mailer, private $projectDir, private $publicFolder, private $themeName)
    {
    }

    public function sendMail($data, $subject, $template)
    {

        // On créer un nouvel environnement twig
        $twig = $this->setTwigEnvironment();

        // on utilise le template twig pour générer le html du mail
        $template = $twig->render($template, [
            'message' => $data->getMotivation(),
            'name' => $data->getLastname(),
            'firstname' => $data->getFirstname(),
            'mail' => $data->getEmail(),
        ]);

        // On créer un nouveaux mail
        $mail = (new TemplatedEmail())
            // Adresse d'expediteur
            ->from($data->getEmail())
            // Adresse de réception
            ->to($data->getMailto())
            // Objet du mail
            ->subject($subject)
            // Contenu du mail
            ->html($template);
        // On envoie le mail
        $this->mailer->send($mail);
    }

    private function setTwigEnvironment()
    {
        $loader = new \Twig\Loader\FilesystemLoader($this->projectDir . '/' . $this->publicFolder . '/theme/' . $this->themeName . '/partials/mail/');
        $twig = new \Twig\Environment($loader, [
            'cache' => $this->projectDir . '/var/cache/twig',
            'debug' => true,
        ]);
        return $twig;
    }
}
