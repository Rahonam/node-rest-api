const SeatModel = require("../../common/models/Seat");

module.exports = {
    createSeat: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createSeatPayload" }
        } */
        const { body } = req;

        SeatModel.createSeat(body)
            .then((seat) => {
                return res.status(200).json({
                    status: true,
                    data: seat.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getAllSeats: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const { query: filters } = req;

        SeatModel.findAllSeats(filters)
            .then((seats) => {
                return res.status(200).json({
                    status: true,
                    data: seats,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getSeatById: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const { 
            params: { seatId } 
        } = req;

        SeatModel.findSeat({id: seatId})
            .then((seat) => {
                return res.status(200).json({
                    status: true,
                    data: seat.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    updateSeat: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createSeatPayload" }
        } */
        const {
            params: { seatId },
            body: payload
        } = req;

        if(!Object.keys(payload).length){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Empty payload, nothing to update."
                },
            });
        }

        SeatModel.updateSeat({id: seatId}, payload)
            .then((affectedRows) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfSeatsUpdated: affectedRows[0],
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

    deleteSeat: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const {
            params: { seatId }
        } = req;

        SeatModel.deleteSeat({id: seatId})
            .then((deleteCount) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfSeatsDeleted: deleteCount,
                    }
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },
}