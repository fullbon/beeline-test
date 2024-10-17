FROM php:8.3.8-apache-bullseye

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /var/www/html

RUN apt-get update -y

COPY --from=mirror.gcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/
RUN install-php-extensions pdo_pgsql pgsql

CMD ["apache2-foreground"]
