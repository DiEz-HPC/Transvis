<?php

namespace App\Command;

use Bolt\Entity\Content;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Service\GeneratePreview;

#[AsCommand(
    name: 'app:create-preview',
    description: 'This is a command to create a preview of a realisation',
)]
class CreatePreviewCommand extends Command
{
    public function __construct(private EntityManagerInterface $em, private GeneratePreview $generatePreview)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $arg1 = $input->getArgument('arg1');

        $contents = $this->em->getRepository(Content::class)->findBy(['contentType' => 'nos-realisations']);
      
        foreach($contents as $content){
            if($content->getFieldValue('video')['filename'] == null || $content->getFieldValue('video')['filename'] == ""){
                $io->writeln('La réalisation portant l\id : ' . $content->getFieldValue('id') . ' n\'a pas de video');
            }else{
                $io->writeln('La réalisation portant l\id : ' . $content->getFieldValue('id') . ' a une video');
                $io->writeln('Génération de la preview...');

                $this->generatePreview->generatePreview($content);
            }
        }

        return Command::SUCCESS;
    }
}
