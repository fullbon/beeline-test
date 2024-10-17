#!/bin/bash

composer install

php artisan migrate
php artisan key:generate

npm i

apache2-foreground