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
const categoryService_1 = require("../services/categoryService");
const categorySchema_1 = require("../schemas/categorySchema");
const validationHandler_1 = require("../middlewares/validationHandler");
const router = express_1.default.Router();
const service = categoryService_1.categoryService.getInstance();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield service.toList();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(400).send("Something went wrong");
    }
}));
router.post("/", (0, validationHandler_1.validationHandler)(categorySchema_1.createUpdateCategorySchema, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        let newCategory = yield service.create(name);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(400).send("Something went wrong.");
    }
}));
router.patch("/:id", (0, validationHandler_1.validationHandler)(categorySchema_1.getCategorySchema, "params"), (0, validationHandler_1.validationHandler)(categorySchema_1.createUpdateCategorySchema, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        let newCategory = yield service.update(id, name);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(400).send("Something went wrong.");
    }
}));
router.delete("/:id", (0, validationHandler_1.validationHandler)(categorySchema_1.getCategorySchema, "params"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        let deletedCategory = yield service.delete(id);
        res.status(201).send(`Category: ${deletedCategory.name} was deleted succesfully.`);
    }
    catch (error) {
        res.status(400).send("Something went wrong.");
    }
}));
exports.default = router;
