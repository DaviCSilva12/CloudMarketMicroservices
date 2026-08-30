# Stage 1: Build dependencies
FROM php:8.2-fpm-alpine AS builder

RUN apk add --no-cache git unzip libzip-dev \
    && docker-php-ext-install pdo_mysql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader

COPY . .
RUN composer dump-autoload --optimize

# Stage 2: Runtime
FROM php:8.2-fpm-alpine

RUN apk add --no-cache libzip-dev \
    && docker-php-ext-install pdo_mysql zip

WORKDIR /var/www

COPY --from=builder /var/www /var/www

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

USER www-data

EXPOSE 9000

CMD ["php-fpm"]
