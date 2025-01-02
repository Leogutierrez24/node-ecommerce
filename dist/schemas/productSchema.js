"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().uuid();
const name = joi_1.default.string().alphanum().min(3).max(30);
const price = joi_1.default.number().integer().min(0);
exports.createProductSchema = joi_1.default.object({
    name: name.required(),
    price: price.required(),
});
exports.updateProductSchema = joi_1.default.object({
    name: name,
    price: price,
});
exports.getProductSchema = joi_1.default.object({
    id: id.required(),
});
