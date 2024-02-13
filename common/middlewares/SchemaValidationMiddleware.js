const Ajv = require("ajv");
const AJV_OPTIONS = { allowError: true };

module.exports = {
    /**
     * @description Validates the request body/payload against given schema
     * 
     * @param {Object} schema - Schema to validate
     * 
     * @returns {Function} - Request handler
     */
    verify: (schema) => {
        if(!schema){
            throw new Error("Schema not provided");
        }

        return (req, res, next) => {
            const { body } = req;
            const ajv = new Ajv(AJV_OPTIONS);
            
            const validate = ajv.compile(schema);
            const isValid = validate(body);

            if(isValid){
                return next();
            }

            return res.send({
                status: false,
                error: {
                    message: `Invalid Payload: ${ajv.errorsText(validate.errors)}`
                }
            });
        }
    }
};