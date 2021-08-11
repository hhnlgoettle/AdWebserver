# Ad Webserver

A server written in nodejs to deliver creatives to users.

## Requirements

- npm
- node
- (opt) docker, docker compose

## Installation

- clone the repo
- run `npm i` to install dependencies
- copy `.env.example` to `.env`
- update `.env` to match your configuration

## Env vars

`NODE_ENV` [development, production, test] set this to the matching environment

`REST_PORT` Server Port

`CORS_WHITELIST` Array of hosts that are accepted for CORS

`JWT_PUB_KEY` Public Key

`JWT_PRIV_KEY` Private Key 

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


