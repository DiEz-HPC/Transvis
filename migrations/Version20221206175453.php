<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221206175453 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bolt_contact_message ADD is_answered TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE bolt_field_translation CHANGE value value JSON NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE bolt_contact_message DROP is_answered');
        $this->addSql('ALTER TABLE bolt_field_translation CHANGE value value JSON NOT NULL');
    }
}
