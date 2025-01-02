"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPasswordNotMatch = void 0;
class ErrorPasswordNotMatch extends Error {
    constructor(message = "The passwords don't match.") {
        super(message);
    }
}
exports.ErrorPasswordNotMatch = ErrorPasswordNotMatch;
