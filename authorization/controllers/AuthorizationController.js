const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { generateUsername } = require("unique-username-generator");

const UserModel = require("../../common/models/User");

const { roles, jwtSecret, jwtExpirationInSeconds } = require("../../config");

// Generate Access Token
const generateAccessToken = (username, userId) => {
    return jwt.sign(
        {
            userId,
            username,
        },
        jwtSecret,
        {
            expiresIn: jwtExpirationInSeconds,
        }
    );
};

// Encrypt Password
const encryptPassword = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};

module.exports = {
    register: (req, res) => {
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/registerPayload" }
        } */
        const payload = req.body;
        let role = payload.role || roles.USER;

        const encryptedPassword = encryptPassword(payload.password);
        const username = generateUsername("", 3, 20, payload.name);

        const userPayload = {
            ...payload,
            password: encryptedPassword,
            role: role,
            username: username
        };

        UserModel.createUser(userPayload)
            .then((user) => {
                const accessToken = generateAccessToken(user.username, user.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: user.toJSON(),
                        token: accessToken,
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

    login: (req, res) => {
        /*  #swagger.requestBody = {
            required: true,
            schema: { $ref: "#/components/schemas/loginPayload" }
        } */
        const { username, password } = req.body;

        UserModel.findUser({username: username})
            .then((user) => {
                if(!user){
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: "Invalid Username",
                        },
                    });
                }

                const encryptedPassword = encryptPassword(password);

                if(user.password !== encryptedPassword){
                    return res.status(400).json({
                        status: false,
                        error: {
                            message: "Invalid Password",
                        },
                    });
                }

                const accessToken = generateAccessToken(user.username, user.id);

                return res.status(200).json({
                    status: true,
                    data: {
                        user: user.toJSON(),
                        token: accessToken,
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