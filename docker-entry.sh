
#!/bin/sh

composer install
apt update -yq && apt upgrade -yq && apt install npm -yq && npm install -y
npm run build


php bin/console doctrine:database:create --if-not-exists --quiet --no-interaction
php bin/console doctrine:migrations:migrate --verbose --no-interaction --allow-no-migration

## On donne les droits sur les dossiers
chmod -R 777 var
chmod -R 777 public

## On s'approprie les dossiers
chown -R www-data:www-data var
chown -R www-data:www-data public

php bin/console assets:install public
php bin/console cache:clear
php bin/console cache:warmup

## server config
php-fpm &
nginx -g "daemon off;"