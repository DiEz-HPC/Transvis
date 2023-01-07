<?php

namespace App\Controller;

use App\Service\SendMail;
use App\Entity\Candidature;
use App\Form\RecrutementsType;
use Bolt\Controller\TwigAwareController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class RecrutementsFormController extends TwigAwareController
{


    public function __construct(
        private EntityManagerInterface $entityManager,
        private SendMail $sendMail,
    ) {
    }

    #[Route('/render/form', name: 'app_recrutements_form_render')]
    public function recrutementsForm(Request $request): Response
    {
        $form = $this->createForm(RecrutementsType::class, null, [
            'action' => $this->generateUrl('app_recrutements_form_render_submit'),
        ]);

        return $this->render('partials/forms/_frontRecrutementsForm.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/render/form/submit', name: 'app_recrutements_form_render_submit')]
    public function recrutementsFormSubmit(Request $request, SluggerInterface $slugger)
    {
        $form = $this->createForm(RecrutementsType::class);
        $form->handleRequest($request);
       
        if ($form->isSubmitted() && $form->isValid()) {
            $newFilename = $this->uploadFile($form, $slugger);
            $data = $form->getData();
            $this->handleData($data, $newFilename);
            
            $this->sendMail->sendMail($data, 'Nouvelle candidature !', '_recrutementEmail.twig');

            return $this->redirectToRoute('record', ['contentTypeSlug' => 'recrutements', 'slugOrId' => $data->getJobId()]);
        }elseif($form->isSubmitted() && !$form->isValid()){
            if($form->getErrors(true)){
                foreach($form->getErrors(true) as $error){
                    $this->addFlash('error', $error->getMessage());
                }
            }
            $this->addFlash('error', 'Une erreur est survenue, veuillez réessayer.');
            return $this->redirectToRoute('record', ['contentTypeSlug' => 'recrutements', 'slugOrId' => $form->getData()->getJobId()]);
        }
    }


    private function uploadFile($form, SluggerInterface $slugger)
    {
        $brochureFile = $form->get('filename')->getData();

        // this condition is needed because the 'brochure' field is not required
        // so the PDF file must be processed only when a file is uploaded
        if ($brochureFile) {
            $originalFilename = pathinfo($brochureFile->getClientOriginalName(), PATHINFO_FILENAME);
            // this is needed to safely include the file name as part of the URL
            $safeFilename = $slugger->slug($originalFilename);
            $newFilename = $safeFilename . '-' . uniqid() . '.' . $brochureFile->guessExtension();

            // Move the file to the directory where brochures are stored
            try {
                $brochureFile->move(
                    $this->getParameter('upload_directory'),
                    $newFilename
                );
            } catch (FileException $e) {
                // ... handle exception if something happens during file upload
                $e->getMessage();
            }
          
        }
        return $newFilename;
    }

    private function handleData(Candidature $data, $filename)
    {
        // On vérifie si la candidature existe déjà
        $candidature = $this->entityManager->getRepository(Candidature::class)->findOneBy([
            'email' => $data->getEmail(),
            'jobId' => $data->getJobId(),
        ]);
        if(!$candidature){
        $candidature = new Candidature();
        $candidature->setLastname($data->getLastname());
        $candidature->setFirstname($data->getFirstname());
        $candidature->setEmail($data->getEmail());
        $candidature->setMotivation($data->getMotivation());
        $candidature->setfilename($filename);
        $candidature->setJob($data->getJob());
        $candidature->setJobId($data->getJobId());
        $candidature->setCreatedAt(new \DateTime());
        $entityManager = $this->entityManager;
        $entityManager->persist($candidature);
        $entityManager->flush();
        $this->addFlash('success', 'Votre candidature a bien été envoyée.');
        }else{
            $this->addFlash('error', 'Vous avez déjà postulé à cette offre.');
        }
    }
}
