const { seatStatus } = require("../../config");

module.exports = {
    type: "object",
    properties: {
        number: {
            type: "number",
        },
        fare: {
            type: "number",
        },
        status: {
            type: "string",
            enum: Object.values(seatStatus)
        },
    },
    required: ["number", ],
    additionalProperties: false,
}