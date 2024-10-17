#!/bin/bash

composer install

php artisan migrate
php artisan key:generate

npm i
npm run build

apache2-foreground