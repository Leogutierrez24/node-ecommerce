"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.createUserSchema = exports.getUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().uuid();
const user = joi_1.default.string().alphanum().min(5).max(20);
const password = joi_1.default.string();
exports.getUserSchema = joi_1.default.object({
    id: id.required()
});
exports.createUserSchema = joi_1.default.object({
    user: user.required(),
    password: password.required()
});
exports.updatePasswordSchema = joi_1.default.object({
    newPassword: password.required(),
    oldPassword: password.required()
});
