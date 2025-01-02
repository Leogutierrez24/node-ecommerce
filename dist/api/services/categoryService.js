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
exports.categoryService = void 0;
const uuid_1 = require("uuid");
class categoryService {
    constructor() {
        this.categories = [];
        this.initialize();
    }
    static getInstance() {
        if (this.instance === null || this.instance === undefined)
            this.instance = new categoryService();
        return this.instance;
    }
    initialize() {
        for (let i = 0; i < 10; i++) {
            let category = {
                id: (0, uuid_1.v4)(),
                name: "Category " + i,
            };
            this.categories.push(category);
        }
    }
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let newCategory = {
                id: (0, uuid_1.v4)(),
                name: name,
            };
            this.categories.push(newCategory);
            return newCategory;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let deletedCategory = [];
            let index = this.categories.findIndex(category => category.id === id);
            if (index !== -1)
                deletedCategory = this.categories.splice(index, 1);
            else
                throw new Error("Category not found");
            return deletedCategory[0];
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this.categories.findIndex(category => category.id === id);
            if (index !== -1)
                this.categories[index].name = changes;
            else
                throw new Error("Category not found.");
        });
    }
    toList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categories;
        });
    }
}
exports.categoryService = categoryService;
