"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
const errorHandler_1 = require("./middlewares/errorHandler");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
const whitelist = ["http://localhost:8080"];
const options = {
    origin: whitelist
};
app.use((0, cors_1.default)(options));
app.use((0, helmet_1.default)());
app.get("/api", (req, res) => {
    res.send("Hola, este es mi servidor en Express.");
});
app.get("/api/nueva-ruta", (req, res) => {
    res.send("Soy un nuevo Endpoint");
});
(0, index_1.routerApi)(app);
app.use(errorHandler_1.logErrors);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log("Server running on port: " + port);
});
