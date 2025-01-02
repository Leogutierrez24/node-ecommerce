"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorUserNotFound = void 0;
class ErrorUserNotFound extends Error {
    constructor(message = "User not Found.") {
        super(message);
    }
}
exports.ErrorUserNotFound = ErrorUserNotFound;
