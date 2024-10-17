FROM php:8.3.8-apache-bullseye

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

RUN apt-get update && apt-get install -y \
    git docker.io apt-utils memcached zip  \
    unzip software-properties-common gnupg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  # Очистка кэша пакетов

# npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Расширение PHP для работы с PostgreSQL
COPY --from=mirror.gcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions pdo_pgsql

# Куда будет смотреть апач
ENV APACHE_DOCUMENT_ROOT /app/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY config/service /service
RUN chmod 777 /service/start.sh

RUN a2enmod rewrite

CMD ["/service/start.sh"]