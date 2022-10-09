# Sensoteq DVD Rental

This repo consists of
- server - express API with Postgresql
- client - React UI

### Install
From root folder run `npm install`
This will install all dependencies for server and client

### Run in dev-mode
From root folder run `npm start`
This spawns server and client projects and a proxy for them on `PORT: 3000`

`http://localhost:3000/` will launch the app UI

`http://localhost:3000/v1/*` has all the apis

##### `docs` contain openapi spec for the express apis provided
