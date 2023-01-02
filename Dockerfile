FROM php:8.0.13-fpm

# Copy composer.lock and composer.json
COPY ./composer.lock ./composer.json /var/www/
COPY docker-entry.sh /var/www/
RUN chmod +x /var/www/docker-entry.sh

# Set working directory
WORKDIR /var/www

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libpq-dev \
    libonig-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libmcrypt-dev \
    libpng-dev \
    libwebp-dev \
    zlib1g-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    graphviz \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    git \
    curl \
    libcurl4 \
    libcurl4-openssl-dev \
    nginx

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
# mcrypt
RUN pecl install mcrypt-1.0.4
RUN docker-php-ext-enable mcrypt
# Install extensions
RUN docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp
RUN docker-php-ext-install -j$(nproc) gd
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install -j$(nproc) intl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --no-interaction -o --no-scripts
# Add user for laravel application
#RUN groupadd -g 1000 www
#RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory
COPY . /var/www/

RUN ls /var/www

COPY ./configuration/nginx/conf.d/ /etc/nginx/conf.d/
RUN ls /etc/nginx/conf.d

COPY ./configuration/php/local.ini /usr/local/etc/php/conf.d/local.ini
RUN ls /usr/local/etc/php/conf.d
RUN cat /usr/local/etc/php/conf.d/local.ini

RUN rm -rf /etc/nginx/sites-enabled
RUN mkdir -p /etc/nginx/sites-enabled

RUN chmod -R 777 /var/www/
RUN chmod -R 777 /var/www/public
RUN chmod -R 777 /var/www/var
RUN chmod -R 777 /var/www/var/cache
RUN chmod -R 777 /var/www/var/log


# Configure nginx upload size
RUN echo "file_uploads = On\n" \
         "memory_limit = 500M\n" \
         "upload_max_filesize = 500M\n" \
         "post_max_size = 500M\n" \
         "max_execution_time = 600\n" \
         > /usr/local/etc/php/conf.d/uploads.ini
#RUN php bin/console cache:clear (don t do it with a symfony app because composer.json script post install and update do it)

# Expose port 80 and start php-fpm server
EXPOSE 80
CMD ["/var/www/docker-entry.sh"]