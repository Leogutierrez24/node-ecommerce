"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productService_1 = require("../services/productService");
const validationHandler_1 = require("../middlewares/validationHandler");
const productSchema_1 = require("../schemas/productSchema");
const router = express_1.default.Router();
const service = productService_1.productService.getInstance();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield service.toList();
    res.json(products);
}));
router.get("/:id", (0, validationHandler_1.validationHandler)(productSchema_1.getProductSchema, "params"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield service.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(404).json({
            message: "Product not found."
        });
    }
}));
router.get("/categories/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield service.listByCategory(id);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).send("An error occurred.");
    }
}));
router.post("/", (0, validationHandler_1.validationHandler)(productSchema_1.createProductSchema, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, categories } = req.body;
    try {
        let newProduct = yield service.create(name, parseInt(price), categories);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(400).send("An error occurred.");
    }
}));
router.patch("/:id", (0, validationHandler_1.validationHandler)(productSchema_1.getProductSchema, "params"), (0, validationHandler_1.validationHandler)(productSchema_1.updateProductSchema, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        yield service.update(id, body);
        res.status(201).json({
            message: `Product with ID: ${id} was updated.`
        });
    }
    catch (err) {
        res.status(400).send("An error occurred.");
    }
}));
router.delete("/:id", (0, validationHandler_1.validationHandler)(productSchema_1.getProductSchema, "params"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({
            message: `Product with ID: ${id} was deleted.`,
            id,
        });
    }
    catch (err) {
        res.status(404).send("Product not found.");
    }
}));
exports.default = router;
