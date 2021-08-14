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

## REST

### Admin

BaseURL: `/admin`

`register`: `GET`

headers: 
```
    authorization: Basic Auth Header (username:password)
```

returns: 
```
{
    "user": {
        "role": "admin",
        "confirmed": false,
        "_id": "...",
        "username": "...",
        "userId": 1,
        "__v": 0,
        "id": "..."
    }
}
```
NOTE: You need to manually confirm the admin account by setting field `confirmed` to `true`.

---

`login`: `GET`

headers: 
```
    authorization: Basic Auth Header (username:password)
```

returns: 
```
{
    "token": JWT
}
```
NOTE: This token has to be included in subsequent requests as a `bearer` token.


### Customer

NOTE: Customer is a superclass to `Publisher` and `Advertiser`. Customer credentials are used to authenticate both publishers and advertisers.

BaseURL: `/customer`

`register`: `GET`

headers: 
```
    authorization: Basic Auth Header (username:password)
```

returns: 
```
{
    "user": {
        "role": "customer",
        "confirmed": true,
        "_id": "...",
        "username": "...",
        "customerId": 1,
        "__v": 0,
        "id": "..."
    }
}
```
NOTE: Customer account are confirmed by default.

---

`login`: `GET`

headers: 
```
    authorization: Basic Auth Header (username:password)
```

returns: 
```
{
    "token": JWT
}
```
NOTE: This token has to be included in subsequent requests as a `bearer` token.

#### Publisher

baseURL: `/publisher`

---

Create an App

`app`: `POST`

headers: 
```
    authorization: Bearer <<token>>
```

body: 
```
{
    "name": "MyAppName"
}
```
returns: 
```
{
    "app": {
        "_id": "6117a776a185d479d482947c",
        "displayBlocks": [],
        "name": "MyAppName",
        "owner": "6117a6fba185d479d4829472",
        "__v": 0
    }
}
```

---

Get App by ID

`/app/:id`: `GET`

headers: 
```
    authorization: <<token>>
```

params: 
```
"id": "6117a776a185d479d482947c"
```

returns: 
```
{
    "app": {
        "_id": "6117a776a185d479d482947c",
        "displayBlocks": [],
        "name": "MyAppName",
        "owner": "6117a6fba185d479d4829472",
        "__v": 0
    }
}
```

---

Get Apps

`/app`: `GET`

headers: 
```
    authorization: <<token>>
```

returns: 
```
{
    "apps": [
        {
            "_id": "6117a776a185d479d482947c",
            "displayBlocks": [],
            "name": "MyAppName",
            "owner": "6117a6fba185d479d4829472",
            "__v": 0
        }
    ]
}
```

---

Create a Display Block

`app/:id/displayblock`: `POST`

headers: 
```
    authorization: Bearer <<token>>
```
params: 
```
"id": "6117a776a185d479d482947c"
```
body: 
```
{
    "name": "MyDisplayBlockName"
}
```
returns: 
```
{
    "app": {
        "_id": "6117a776a185d479d482947c",
        "displayBlocks": [
            {
                "type": "interactionRewardingAd",
                "_id": "6117a8daa185d479d4829482",
                "name": "MyDisplayBlockName"
            }
        ],
        "name": "MyAppName",
        "owner": "6117a6fba185d479d4829472",
        "__v": 1
    }
}
```

#### Advertiser

BaseURL: `/advertiser`

Create a Campaign

`/campaign`: `POST`

headers: 
```
    authorization: Bearer <<token>>
```

body: 
```
{
    "name": "MyCampaignName"
}
```
returns: 
```
{
    "campaign": {
        "url": null,
        "_id": "6117a9b8a185d479d4829489",
        "name": "MyCampaignName",
        "owner": "61167260ecb2957f54cb5121",
        "__v": 0
    }
}
```

---

Get Campaign by ID

`/campaign/:id`: `GET`

headers: 
```
    authorization: <<token>>
```

params: 
```
"id": "6117a9b8a185d479d4829489"
```

returns: 
```
{
    "campaign": {
        "url": null,
        "_id": "6117a9b8a185d479d4829489",
        "name": "MyCampaignName",
        "owner": "61167260ecb2957f54cb5121",
        "__v": 0
    }
}
```

---

Get Campaigns

`/campaign`: `GET`

headers: 
```
    authorization: <<token>>
```
returns: 
```
{
    "campaigns": [
        {
            "url": null,
            "_id": "6117a9b8a185d479d4829489",
            "name": "MyCampaignName",
            "owner": "61167260ecb2957f54cb5121",
            "__v": 0
        }
    ]
}
```

---

Upload creative

`/campaign/:id/creative/upload`: `POST`

headers: 
```
    authorization: Bearer <<token>>
    content-type: 'multipart/form-data'
```
params: 
```
"id": "6117a9b8a185d479d4829489"
```
form-data: 
```
{
    [
        [
            'creative', <<fileURL>>, <<fileDescription>>
        ]
    ]
}
```
returns: 
```
{
    "campaign": {
        "url": "/creatives/61167260ecb2957f54cb5121/6117a9b8a185d479d4829489",
        "_id": "6117a9b8a185d479d4829489",
        "name": "MyCampaignName",
        "owner": "61167260ecb2957f54cb5121",
        "__v": 0
    }
}
```

---

Delete creative

`/campaign/:id/creative/delete`: `DELETE`

headers: 
```
    authorization: Bearer <<token>>
```
params: 
```
"id": "6117a9b8a185d479d4829489"
```

returns: 
```
{
    "campaign": {
        "url": null,
        "_id": "6117a9b8a185d479d4829489",
        "name": "MyCampaignName",
        "owner": "61167260ecb2957f54cb5121",
        "__v": 0
    },
    "deletedFiles": Number
}
```

---


