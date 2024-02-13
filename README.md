# Booking APIs with NodeJS

This is an Express service that provides authorization functionality and includes separate app folders for users, seats, stops and tickets.
It also uses Sequelize ORM with SQLite as the database, along with the JSON Web Token (JWT) and AJV libraries.

## Project Structure
 - `app.js`: The main entry point of the application.
 - `config.js`: Contains configuration files for the application.
 - `authorization`
   - `controllers`: Controller files for authentication endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the authentication routes.
 - `<app_folder>`
   - `controllers`: Controller files for CRUD endpoints.
   - `schemas`: JSON Schemas against which the body of various routes will be validated.
   - `routes.js`: Registers all the CRUD routes.
 - `common`
   - `middlewares`: Various middlewares that can be used in various routes like (SchemaValidation, isAuthenticated, CheckPermissions etc.)
   - `models`: Sequelise models for the database Tables
 - `storage`: Local storage, that stores all the SQLite tables.

## Prerequisites
Before running the application, make sure you have the following installed:
1. NodeJS (v18)
2. NPM (v9)

## Installation
1. Clone the repository: `git clone https://github.com/Rahonam/node-rest-api.git`
2. Navigate to the project directory: `cd node-rest-api`
3. Install the dependencies: `npm install`

## Usage

To update documetation, run the following command:
```shell
npm run swagger
```
To start the service, run the following command:
```shell
npm start
```

## License
This project is licensed under the MIT License.