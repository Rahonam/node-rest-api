const router = require("express").Router();
const { roles } = require("../config");

// Controller
const adminController = require("./controllers/adminController");

// Middlewares
const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

router.post(
    "/reset-seats",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
    ],
    adminController.resetSeatStatus
);

module.exports = router;