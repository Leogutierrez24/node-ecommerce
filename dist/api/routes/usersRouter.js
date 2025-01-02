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
const userService_1 = require("../services/userService");
const purchaseService_1 = require("../services/purchaseService");
const ErrorUserNotFound_1 = require("../errors/ErrorUserNotFound");
const ErrorPurchaseNotFound_1 = require("../errors/ErrorPurchaseNotFound");
const ErrorPasswordNotMatch_1 = require("../errors/ErrorPasswordNotMatch");
const validationHandler_1 = require("../middlewares/validationHandler");
const userSchema_1 = require("../schemas/userSchema");
const purchaseSchema_1 = require("../schemas/purchaseSchema");
const router = express_1.default.Router();
const service = userService_1.userService.getInstance();
const purchasesService = purchaseService_1.purchaseService.getInstance();
router.get("/:id", (0, validationHandler_1.validationHandler)(userSchema_1.getUserSchema, "params"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let user = yield service.findById(id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(404).json({
            messaje: `User not founded with the id: ${id}.`
        });
    }
}));
router.get("/:userId/purchases", (0, validationHandler_1.validationHandler)(userSchema_1.getUserSchema, "params"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        let user = yield service.findById(userId);
        res.status(200).send(user.purchases);
    }
    catch (err) {
        res.status(404).json({
            message: `User not founded with the id: ${userId}.`
        });
    }
}));
router.get("/:userId/purchases/:purchaseId", (0, validationHandler_1.validationHandler)(userSchema_1.getUserSchema, "params"), (0, validationHandler_1.validationHandler)(purchaseSchema_1.getPurchaseSchema, "params"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, purchaseId } = req.params;
    try {
        let user = yield service.findById(userId);
        let purchase = yield purchasesService.findById(user.purchases, purchaseId);
        res.status(200).send(purchase);
    }
    catch (err) {
        if (err instanceof ErrorUserNotFound_1.ErrorUserNotFound) {
            res.status(404).json({
                message: `User not founded with id: ${userId}.`
            });
        }
        else if (err instanceof ErrorPurchaseNotFound_1.ErrorPurchaseNotFound) {
            res.status(404).json({
                message: `Purchase not founded with id: ${purchaseId}.`
            });
        }
        else {
            res.status(404).json({
                message: "An error occured."
            });
        }
    }
}));
router.post("/", (0, validationHandler_1.validationHandler)(userSchema_1.createUserSchema, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    try {
        yield service.create(username, password);
        res.status(201).json({
            message: "User created."
        });
    }
    catch (error) {
        res.status(400).json({
            message: "An error ocurred. User not created."
        });
    }
}));
router.patch("/:userId", (0, validationHandler_1.validationHandler)(userSchema_1.getUserSchema, "params"), (0, validationHandler_1.validationHandler)(userSchema_1.updatePasswordSchema, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { newPassword, oldPassword } = req.body;
    try {
        const user = yield service.findById(userId);
        yield service.changePassword(user.id, oldPassword, newPassword);
        res.status(201).json({ message: "Password changed." });
    }
    catch (error) {
        if (error instanceof ErrorPasswordNotMatch_1.ErrorPasswordNotMatch)
            res.status(400).json({ message: error.message });
        else if (error instanceof ErrorUserNotFound_1.ErrorUserNotFound)
            res.status(400).json({ message: error.message });
        else
            res.status(400).json({ message: "Something went wrong." });
    }
}));
exports.default = router;
