#!/bin/sh

ng build --configuration production
rm -rf /var/www/unix-history-frontend-angular

cp -r dist/unix-history-frontend-angular /var/www
chown -R www-data:www-data /var/www
