const UserModel = require("../models/User");

module.exports = {
    has: (role) => {
        return (req, res, next) => {
            const {
                user: { userId },
            } = req;

            UserModel.findUser({id: userId})
                .then((user) => {
                    if(!user){
                        return res.status(403).json({
                            status: false,
                            error: "Invalid access token.",
                        });
                    }

                    const userRole = user.role;

                    if(userRole !== role){
                        return res.status(403).json({
                            status: false,
                            error: "Insufficient permissions.",
                        });
                    }

                    next();
                })
                .catch((err) => {
                    return res.status(500).json({
                        status: false,
                        error: err,
                    });
                });
        };
    },
};