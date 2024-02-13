const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

// Schemas
const registerPayload = require("./authorization/schemas/registerPayload");
const loginPayload = require("./authorization/schemas/loginPayload");
const createSeatPayload = require("./seats/schemas/createSeatPayload");
const createStopPayload = require("./stops/schemas/createStopPayload");
const createTicketPayload = require("./tickets/schemas/createTicketPayload");

const doc = {
  info: {
    version: '1.0.0',
    title: 'Booking APIs',
    description: 'APIs to support bus tickets booking'
  },
  servers: [
    {
      url: 'http://127.0.0.1:3000',
      description: 'localhost'
    },
  ],
  tags: [
    {
      name: 'runtime',
      description: 'nodejs'
    }
  ],
  components: {
    securitySchemes:{
      bearerAuth: {
          type: 'http',
          scheme: 'bearer'
      }
    },
    '@schemas': {
        registerPayload: registerPayload,
        loginPayload: loginPayload,
        createSeatPayload : createSeatPayload,
        createStopPayload: createStopPayload,
        createTicketPayload: createTicketPayload,
    }
  }
};
const outputFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen(outputFile, routes, doc);