## Quickstart
- configure .env:
```
MYSQL_DATABASE=apidb
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_USER=apiuser
MYSQL_PASSWORD=apipass
DATABASE_URL="mysql://apiuser:apipass@database:3306/apidb"
JOB_SERVICE_URL="http://localhost:8081"
PROPERTY_SERVICE_URL="http://localhost:8081"
```

- cd ./backend && composer install
- cd ./frontend && npm install
- ./develop.sh
- cd ./backend
- php bin/console doctrine:database:create
- php bin/console doctrine:schema:update --force