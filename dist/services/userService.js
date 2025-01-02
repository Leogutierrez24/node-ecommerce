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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const ErrorPasswordNotMatch_1 = require("../errors/ErrorPasswordNotMatch");
const ErrorUserNotFound_1 = require("../errors/ErrorUserNotFound");
const uuid_1 = require("uuid");
class userService {
    constructor() {
        this.users = [];
        this.initilize();
    }
    static getInstance() {
        if (this.instance === null || this.instance === undefined)
            this.instance = new userService();
        return this.instance;
    }
    initilize() {
        let newUser = { id: "42ad95ca-27a9-452b-ba48-2a162224d360", user: "admin", password: "admin", purchases: [] };
        this.users.push(newUser);
    }
    create(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = {
                id: (0, uuid_1.v4)(),
                user: username,
                password: password,
                purchases: [],
            };
            this.users.push(newUser);
            return newUser;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this.users.findIndex(user => user.id === id);
            if (index !== -1)
                this.users.splice(index, 1);
            else
                throw new ErrorUserNotFound_1.ErrorUserNotFound();
        });
    }
    changePassword(id, oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(id);
            if (user !== undefined) {
                if (oldPassword === user.password)
                    user.password = newPassword;
                else
                    throw new ErrorPasswordNotMatch_1.ErrorPasswordNotMatch();
            }
            else
                throw new ErrorUserNotFound_1.ErrorUserNotFound();
        });
    }
    toList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this.users.findIndex(user => user.id === id);
            if (index !== -1)
                return this.users[index];
            else
                throw new ErrorUserNotFound_1.ErrorUserNotFound();
        });
    }
}
exports.userService = userService;
