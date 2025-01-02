"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = routerApi;
const express_1 = __importDefault(require("express"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const productsRouter_1 = __importDefault(require("./productsRouter"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use("/api/v1", router);
    router.use("/products", productsRouter_1.default);
    router.use("/categories", categoryRouter_1.default);
    router.use("/user", usersRouter_1.default);
}
