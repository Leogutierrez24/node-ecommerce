"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorPurchaseNotFound = void 0;
class ErrorPurchaseNotFound extends Error {
    constructor(message = "Purchase not found.") {
        super(message);
    }
}
exports.ErrorPurchaseNotFound = ErrorPurchaseNotFound;
