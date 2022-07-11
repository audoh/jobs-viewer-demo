#!/bin/bash
docker-compose -f ./docker-compose/dev.yml -p elogbooks-dev --env-file .env up