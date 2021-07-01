# Context

Application to manage E-Commerce Fashion categories in a tree structure.

## Prerequisite

Angular CLI - 11.2.14

Node - 12.18.1 

## MongoDB 

A [MongoDB](https://docs.mongodb.com/manual/tutorial/) database is required (running on `mongodb://localhost:27017/fashion`).
The app will use a schema with name `fashion` and a collection with name `categories`.

## Development server

First run below command at root location:
`npm install`.

Run `npm start` for a Express server. Navigate to `http://localhost:3000/api/health`. The result will be `{"status":"Server is UP"}`.

Run `ng serve --proxy-config proxy.config.json` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `npm test` to execute the unit tests.
