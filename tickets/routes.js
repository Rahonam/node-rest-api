const router = require("express").Router();

// Controller
const ticketController = require("./controllers/ticketController");

// Middlewares
const IsAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// Schemas
const createTicketPayload = require("./schemas/createTicketPayload");
const updateTicketPayload = require("./schemas/updateTicketPayload");

router.get(
    "/",
    [
        IsAuthenticatedMiddleware.check,
    ],
    ticketController.getAllTickets
);

router.get(
    "/:ticketId",
    [
        IsAuthenticatedMiddleware.check,
    ],
    ticketController.getTicketById
);

router.post(
    "/",
    [
        IsAuthenticatedMiddleware.check,
        SchemaValidationMiddleware.verify(createTicketPayload),
    ],
    ticketController.createTicket
);

router.patch(
    "/:ticketId",
    [
        IsAuthenticatedMiddleware.check,
        SchemaValidationMiddleware.verify(updateTicketPayload),
    ],
    ticketController.updateTicket
);

router.delete(
    "/:ticketId",
    [
        IsAuthenticatedMiddleware.check,
    ],
    ticketController.deleteTicket
);

module.exports = router;