# Ad Webserver

A server written in nodejs to deliver creatives to users.

## Requirements

- npm
- node version ^14
- (opt) docker, docker compose

## Installation

- clone the repo
- run `npm i` to install dependencies
- copy `.env.example` to `.env`
- update `.env` to match your configuration

- generate a [RSA key pair](https://www.ssh.com/academy/ssh/keygen)
- copy generated key files `id_rsa` and `id_rsa.pub` into the `keys/` directory 

## Env vars

`NODE_ENV` [development, production, test] set this to the matching environment

`REST_PORT` Server Port

`CORS_WHITELIST` Array of hosts that are accepted for CORS

`CORS_ALLOW_ALL` [true, false] if set to true, all CORS will always be reflected

`MONGO_USER` Username of your MongoDB User

`MONGO_PASSWORD` Password of the MongoDB User

`MONGO_DB` Name of the Database.

`MONGO_HOST` the hostname of the MongoDB

`MONGO_PORT` port of MongoDB

`MONGO_AUTH_DB` the database in which the user creds are stored. by default this is admin

`MONGO_USE_AUTH` [0, 1] set to 1 if your MongoDB requires authentication.

`MONGO_INITDB_ROOT_USERNAME` root username with which the db is initialized when using the provided mongodb docker container

`MONGO_INITDB_ROOT_PASSWORD` root password with which the db is initialized when using the provided mongodb docker container

`MONGO_INITDB_DATABASE` the database which is initialized when using the provided docker image. This should match `MONGO_DB`


## Start 
- run `npm run build` to build the project with babel
- run `npm run serve` to serve the project

### Development

#### Start MongoDB locally

requires docker and docker compose
NOTE: docker-compose was integrated into docker. You may replace `docker compose` with `docker-compose`

Data will be stored in a named volume called "AdWebServerMongoDB".  

to start the database in background: `docker compose -f mongo.docker-compose.yml -d`

to start the database in foreground: `docker compose -f mongo.docker-compose.yml`

to stop the database: `docker compose -f mongo.docker-compose.yml stop`

to remove the image: `docker compose -f mongo.docker-compose.yml down`

to remove the image AND THE VOLUME: `docker compose -f mongo.docker-compose.yml --volumes down`

to remove the volume `docker volume rm AdWebServerMongoDB`

### As Docker Container

- run `docker compose up`

- run in background `docker compose up -d`

### As Docker Container behind traefik proxy

- run `docker compose -f traefik.docker-compose.yml up` 

- run in background `docker compose -f traefik.docker-compose.yml up -d` 


## Documentation

### Code 

Code documentation can be found in `docs/index.html`

Api documentation can be found in `docsApi/index.html`
