const { ticketStatus } = require("../../config");

module.exports = {
    type: "object",
    properties: {
        seatId: {
            type: "number",
            foreignKey: {
                table: "seats",
                column: "id"
            }
        },
        fromStopId: {
            type: "number",
            foreignKey: {
                table: "stops",
                column: "id"
            }
        },
        toStopId: {
            type: "number",
            foreignKey: {
                table: "stops",
                column: "id"
            }
        },
        status: {
            type: "string",
            enum: Object.values(ticketStatus),
        },
        comments: {
            type: "string",
        },
    },
    additionalProperties: false,
};