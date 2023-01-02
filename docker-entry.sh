
#!/bin/sh
echo "docker-entry.sh"
echo "Installation des dépendances"
composer install
apt update -yq && apt upgrade -yq && apt install npm -yq && npm install -y
npm run build

echo "Création de la base de données"
php bin/console doctrine:database:create --if-not-exists --quiet --no-interaction
php bin/console doctrine:migrations:migrate --verbose --no-interaction --allow-no-migration

echo "Attribution des droits sur les dossiers"
## On donne les droits sur les dossiers
chmod -R 777 var
chmod -R 777 public
chmod -R 777 var/cache
echo "Fin de l'attribution des droits sur les dossiers"

ls

ls -l var/cache

echo "Installation des assets"
php bin/console assets:install public
php bin/console cache:clear
php bin/console cache:warmup

echo "Build terminé, Lancement du serveur"

## server config
php-fpm &
nginx -g "daemon off;"