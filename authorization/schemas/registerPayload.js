const { roles, genders } = require("../../config");

module.exports = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        password: {
            type: "string",
        },
        phone: {
            type: "string",
        },
        email: {
            type: "string",
        },
        age: {
            type: "number",
        },
        gender: {
            type: "string",
            enum: Object.values(genders),
        },
        role: {
            type: "string",
            enum: Object.values(roles),
        },
    },
    required: ["name", "password", "phone", "age", "gender"],
    additionalProperties: false,
};