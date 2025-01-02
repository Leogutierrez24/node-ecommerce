"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = validationHandler;
function validationHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: true });
        if (error) {
            res.status(400).send({ error: error.message });
        }
        else {
            next();
        }
    };
}
