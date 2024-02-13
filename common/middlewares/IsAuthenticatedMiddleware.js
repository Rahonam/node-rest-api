const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

module.exports = {
    check: (req, res, next) => {
        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return res.status(401).json({
                status: false,
                error: {
                    message: "authorization header required.",
                }
            });
        }

        if(!authHeader.startsWith("Bearer")){
            return res.status(401).json({
                status: false,
                error: {
                    message: "Invalid authorization mechanism.",
                }
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                status: false,
                error: {
                    message: "Bearer token required in authorization header.",
                }
            });
        }

        jwt.verify(token, jwtSecret, (err, user) => {
            if(err){
                return res.status(403).json({
                    status: false,
                    error: {
                        message: "Invalid access token.",
                    }
                });
            }

            req.user = user;
            next();
        });
    },
};