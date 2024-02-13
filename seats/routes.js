const router = require("express").Router();
const { roles } = require("../config");

// Controllers
const SeatContoller = require("./controllers/seatController");

// Middlewares
const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// Schemas
const createSeatPayload = require("./schemas/createSeatPayload");
const updateSeatPayload = require("./schemas/updateSeatPayload");

router.get(
    "/",
    [
        IsAuthenticatedMiddleware.check,
    ],
    SeatContoller.getAllSeats
);

router.get(
    "/:seatId",
    [
        IsAuthenticatedMiddleware.check,
    ],
    SeatContoller.getSeatById
);

router.post(
    "/",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(createSeatPayload),
    ],
    SeatContoller.createSeat
);

router.patch(
    "/:seatId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
        SchemaValidationMiddleware.verify(updateSeatPayload),
    ],
    SeatContoller.updateSeat
);

router.delete(
    "/:seatId",
    [
        IsAuthenticatedMiddleware.check,
        CheckPermissionMiddleware.has(roles.ADMIN),
    ],
    SeatContoller.deleteSeat
);

module.exports = router;