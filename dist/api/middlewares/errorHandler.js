"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logErrors = logErrors;
exports.errorHandler = errorHandler;
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
}
