const UserModel = require("../../common/models/User");

module.exports = {
    createUser: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createUserPayload" }
        } */
        const { body } = req;

        UserModel.createUser(body)
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getAllUsers: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const { query: filters } = req;

        UserModel.findAllUsers(filters)
            .then((users) => {
                return res.status(200).json({
                    status: true,
                    data: users,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    getUserById: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const { 
            params: { userId }, 
        } = req;

        UserModel.findUser({id: userId})
            .then((user) => {
                return res.status(200).json({
                    status: true,
                    data: user.toJSON(),
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: false,
                    error: err,
                });
            });
    },

    updateUser: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/createUserPayload" }
        } */
        const { 
            params: { userId },
            body: payload, 
        } = req;

        if(!Object.keys(payload).length){
            return res.status(400).json({
                status: false,
                error: {
                    message: "Empty payload, nothing to update",
                },
            });
        }

        const userPayload = {
            ...payload,
            updatedAt: new Date()
        }

        UserModel.updateUser({id: userId}, userPayload)
            .then((affectedRows) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfUsersUpdated: affectedRows[0],
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

    deleteUser: (req, res) => {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        const {
            params: { userId },
        } = req;

        UserModel.deleteUser({id: userId})
            .then((deleteCount) => {
                return res.status(200).json({
                    status: true,
                    data: {
                        numberOfUsersDeleted: deleteCount
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