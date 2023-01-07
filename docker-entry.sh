
#!/bin/sh
echo "docker-entry.sh"
echo "Installation des dépendances"
composer install
apt update -yq && apt upgrade -yq && apt install npm -yq && npm install -y
npm run build

echo "Création de la base de données"
php bin/console doctrine:database:create --if-not-exists --quiet --no-interaction
echo "Chargement des migrations"
php bin/console doctrine:migrations:migrate --verbose --no-interaction --allow-no-migration

echo "Installation des assets"
php bin/console assets:install public
echo "Suppression du cache"
php bin/console cache:clear
echo "Initialisation du cache"
php bin/console cache:warmup
echo "Attribution des droits sur les dossiers de cache"
chmod -R 777 var
chmod -R 777 public

echo "Build terminé, Lancement du serveur"
## server config
php-fpm &
nginx -g "daemon off;"