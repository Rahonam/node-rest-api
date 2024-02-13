const router = require("express").Router();

// Controller
const AuthorizationController = require("./controllers/AuthorizationController");

// Middleware
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// Schemas
const registerPayload = require("./schemas/registerPayload");
const loginPayload = require("./schemas/loginPayload");

router.post(
    "/signup",
    [
        SchemaValidationMiddleware.verify(registerPayload),
    ],
    AuthorizationController.register
);

router.post(
    "/login",
    [
        SchemaValidationMiddleware.verify(loginPayload),
    ],
    AuthorizationController.login
);

module.exports = router;