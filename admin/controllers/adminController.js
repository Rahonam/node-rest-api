const SeatModel = require("../../common/models/Seat");
const { seatStatus } = require("../../config");

module.exports = {
    resetSeatStatus: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        SeatModel.updateSeat(
            {status: seatStatus.RESERVED},
            {status: seatStatus.AVAILABLE}
        )
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
};