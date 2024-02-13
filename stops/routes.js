const router = require("express").Router();
const { roles } = require("../config");

// Controller
const stopController = require("./controllers/stopController");

// Middlewares
const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// Schemas
const createStopPayload = require("./schemas/createStopPayload");
const updateStopPayload = require("./schemas/updateStopPayload");

router.get(
    "/",
    [
        IsAuthenticatedMiddleware.check,
    ],
    stopController.getAllStops
);

router.get(
    "/:stopId",
    [
        IsAuthenticatedMiddleware.check,
    ],
    stopController.getAllStops
);

router.post(
    "/",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(createStopPayload),
    ],
    stopController.createStop
);

router.patch(
    "/:stopId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(updateStopPayload),
    ],
    stopController.updateStop
);

router.delete(
    "/:stopId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
    ],
    stopController.deleteStop
);

module.exports = router;