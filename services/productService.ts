import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";

export class ProductService {
  private static instance: ProductService;
  public products: IProduct[] = [];

  private constructor() {
    this.generate();
  }

  generate() {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: Date.now(),
        name: "Product " + i,
        price: 1500,
        categories: [],
      });
    }
  }

  public static getInstance(): ProductService {
    if (this.instance === null) this.instance = new ProductService();
    return this.instance;
  }

  async create(name: string, price: number, categories: ICategory[]): Promise<IProduct> {
    let newProduct: IProduct = {
      id: Date.now(),
      name: name,
      price: price,
      categories: categories
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async toList() {
    return this.products;
  }

  async findById(id: number): Promise<IProduct | undefined> {
    let product: IProduct | undefined = this.products.find(product => product.id === id);
    if (!product) throw new Error("Product not found.");
    return product;
  }

  async update(id: number, changes: Partial<IProduct>) {
    let index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      let product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
    } else throw new Error("Product not found.");
  }

  async delete(id: number){
    let index = this.products.findIndex(product => product.id === id);
    if (index !== -1) this.products.splice(index, 1);
    else throw new Error("Product not found.");
  }
}
