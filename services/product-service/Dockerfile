# Stage 1: Build dependencies
FROM php:8.2-fpm-alpine AS builder

# Instalar extensões e composer
RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copiar apenas os arquivos de dependência primeiro para aproveitar cache
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist --optimize-autoloader

# Copiar resto do código
COPY . .
RUN composer dump-autoload --optimize

# Stage 2: Imagem final enxuta e segura
FROM php:8.2-fpm-alpine

# Dependências necessárias em runtime
RUN apk add --no-cache libzip-dev \
    && docker-php-ext-install pdo_mysql zip

WORKDIR /var/www

# Copiar código compilado do builder
COPY --from=builder /var/www /var/www

# Ajustar permissões e rodar como usuário não-root (www-data padrão no FPM-Alpine)
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage /var/www/bootstrap/cache

# Switch para non-root user
USER www-data

EXPOSE 9000

CMD ["php-fpm"]
