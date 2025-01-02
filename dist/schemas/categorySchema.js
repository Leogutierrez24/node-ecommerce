"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategorySchema = exports.createUpdateCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const id = joi_1.default.string().uuid();
const name = joi_1.default.string().alphanum().min(3).max(30);
exports.createUpdateCategorySchema = joi_1.default.object({
    name: name.required(),
});
exports.getCategorySchema = joi_1.default.object({
    id: id.required(),
});
