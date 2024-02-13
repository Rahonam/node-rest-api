const TicketModel = require("../../common/models/Ticket");

module.exports = {
    createTicket: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createTicketPayload" }
        } */
        const { body } = req;

        TicketModel.createTicket(body)
            .then((ticket) => {
                return res.status(200).json({
                    status: true,
                    data: ticket.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getAllTickets: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const { query: filters } = req;

        TicketModel.findAllTickets(filters)
            .then((tickets) => {
                return res.status(200).json({
                    status: true,
                    data: tickets,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getTicketById: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const {
            params: { ticketId }
        } = req;

        TicketModel.findTicket({id: ticketId})
            .then((ticket) => {
                return res.status(200).json({
                    status: true,
                    data: ticket.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    updateTicket: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createTicketPayload" }
        } */
        const {
            params: { ticketId },
            body: payload
        } = req;

        if(!Object.keys(payload).length){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Empty payload, nothing to update.",
                }
            });
        }

        TicketModel.updateTicket({id: ticketId}, payload)
            .then((affectedRows) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfTicketsUpdated: affectedRows[0],
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    deleteTicket: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const {
            params: { ticketId }
        } = req;

        TicketModel.deleteTicket({id: ticketId})
            .then((deleteCount) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfTicketsDeleted: deleteCount,
                    },
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
};