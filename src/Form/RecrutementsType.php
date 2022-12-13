<?php

namespace App\Form;

use App\Entity\Candidature;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Validator\Constraints\File;

class RecrutementsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('lastname', TextType::class, [
                'label' => 'Nom',
                'attr' => [
                    'placeholder' => 'NOM ...',
                ],
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez renseigner votre nom',
                    ]),
                    new Length([
                        'min' => 3,
                        'minMessage' => 'Votre nom doit comporter au moins {{ limit }} caractères',
                        'max' => 75,
                        'maxMessage' => 'Votre nom ne peut pas comporter plus de {{ limit }} caractères',
                    ]),
                ],
            ])
            ->add('firstname',
                TextType::class,
                [
                    'label' => 'Prénom',
                    'attr' => [
                        'placeholder' => 'Prénom ...',
                    ],
                    'required' => true,
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Veuillez renseigner votre prénom',
                        ]),
                        new Length([
                            'min' => 3,
                            'minMessage' => 'Votre prénom doit comporter au moins {{ limit }} caractères',
                            'max' => 75,
                            'maxMessage' => 'Votre prénom ne peut pas comporter plus de {{ limit }} caractères',
                        ]),
                    ],
                ]
            )
            ->add('email', EmailType::class, [
                'label' => 'Adresse mail',
                'attr' => [
                    'placeholder' => 'Adresse mail ...',
                ],
                'required' => true,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez renseigner votre email',
                    ]),
                    new Email(
                        [
                            'message' => 'Veuillez renseigner un email valide',
                        ]
                    )
                ],
            ])
            ->add('motivation',
                TextareaType::class,
                [
                    'label' => 'Motivation',
                    'attr' => [
                        'placeholder' => 'Parlez-nous de vous...',
                    ],
                    'required' => true,
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Veuillez renseigner votre motivation',
                        ]),
                    ],
                ]
            )
            ->add('filename',
                FileType::class,
                [
                    'label' => 'CV',
                    'attr' => [
                        'placeholder' => 'CV ...',
                    ],
                    'required' => true,
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Veuillez renseigner votre CV',
                        ]),
                        new File(
                            [
                                'maxSize' => '2048k',
                                'mimeTypes' => [
                                    'application/pdf',
                                    'application/x-pdf',
                                ],
                                'mimeTypesMessage' => 'Veuillez renseigner un fichier PDF',
                            ]
                        )
                    ],
                ]
            )
            ->add('job',HiddenType::class)
            ->add('job_id',HiddenType::class)
            ->add('mailto',HiddenType::class)
            ->add('submit', SubmitType::class, [
                'label' => 'Envoyer',
                'attr' => [
                    'class' => 'btn btn-primary',
                ],
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Candidature::class,
        ]);
    }
}
