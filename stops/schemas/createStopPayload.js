module.exports = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        isTerminal: {
            type: "boolean",
        }
    },
    required: ["name"],
    additionalProperties: false,
}