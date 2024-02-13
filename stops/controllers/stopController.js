const StopModel = require("../../common/models/Stop");

module.exports = {
    createStop: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createStopPayload" }
        } */
        const { body } = req;

        StopModel.createStop(body)
            .then((stop) => {
                return res.status(200).json({
                    status: true,
                    data: stop.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getAllStops: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const { query: filters } = req;

        StopModel.findAllStops(filters)
            .then((stops) => {
                return res.status(200).json({
                    status: true,
                    data: stops,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getStopById: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const {
            params: { stopId }
        } = req;

        StopModel.findStop({id: stopId})
            .then((stop) => {
                return res.status(200).json({
                    status: true,
                    data: stop.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    updateStop: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createStopPayload" }
        } */
        const {
            params: { stopId },
            body: payload
        } = req;

        if(!Object.keys(payload).length){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Empty payload, nothing to update.",
                },
            });
        }

        StopModel.updateStop({id: stopId}, payload)
            .then((affectedRows) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfStopsUpdated: affectedRows[0],
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

    deleteStop: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const {
            params: { stopId }
        } = req;

        StopModel.deleteStop({id: stopId})
            .then((deleteCount) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfStopsDeleted: deleteCount,
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