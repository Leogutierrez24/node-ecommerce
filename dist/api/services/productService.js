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
exports.productService = void 0;
const uuid_1 = require("uuid");
class productService {
    constructor() {
        this.products = [];
        this.initialize();
    }
    static getInstance() {
        if (this.instance === null || this.instance === undefined)
            this.instance = new productService();
        return this.instance;
    }
    initialize() {
        for (let i = 0; i < 100; i++) {
            this.products.push({
                id: (0, uuid_1.v4)(),
                name: "Product " + i,
                price: 1500,
                categories: [],
            });
        }
    }
    create(name, price, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            let newProduct = {
                id: (0, uuid_1.v4)(),
                name: name,
                price: price,
                categories: categories
            };
            this.products.push(newProduct);
            return newProduct;
        });
    }
    toList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.products;
        });
    }
    listByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let productsByCategory = [];
            this.products.forEach(product => {
                if (product.categories.length > 0) {
                    if (product.categories.find(category => category.id === categoryId))
                        productsByCategory.push(product);
                }
            });
            return productsByCategory;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = this.products.find(product => product.id === id);
            if (!product)
                throw new Error("Product not found.");
            return product;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this.products.findIndex(product => product.id === id);
            if (index !== -1) {
                let product = this.products[index];
                this.products[index] = Object.assign(Object.assign({}, product), changes);
            }
            else
                throw new Error("Product not found.");
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this.products.findIndex(product => product.id === id);
            if (index !== -1)
                this.products.splice(index, 1);
            else
                throw new Error("Product not found.");
        });
    }
}
exports.productService = productService;
