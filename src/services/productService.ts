import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";
import { v4 as uuidv4 } from "uuid";
import { productMP } from "../dal/productMP";

export class productService {
  private static instance: productService;
  private products: IProduct[] = [];

  private productMapper = new productMP();

  private constructor() {
    this.initialize();
  }

  public static getInstance(): productService {
    if (this.instance === null || this.instance === undefined) this.instance = new productService();
    return this.instance;
  }

  private initialize(): void {
    for (let i = 0; i < 100; i++) {
      this.products.push({
        id: uuidv4(),
        name: "Product " + i,
        price: 1500,
        categories: [],
      });
    }
  }

  public async create(name: string, price: number, categories: ICategory[]): Promise<IProduct> {
    let newProduct: IProduct = {
      id: uuidv4(),
      name: name,
      price: price,
      categories: categories
    }
    this.products.push(newProduct);
    return newProduct;
  }

  /*public async toList() {
    return this.products;
  }*/

  public async toList() {
    return this.productMapper.toList();
  }

  public async listByCategory(categoryId: string): Promise<IProduct[]> {
    let productsByCategory: IProduct[] = [];

    this.products.forEach(product => {
      if (product.categories.length > 0) {
        if (product.categories.find(category => category.id === categoryId)) productsByCategory.push(product);
      }
    });

    return productsByCategory;
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    let product: IProduct | undefined = this.products.find(product => product.id === id);
    if (!product) throw new Error("Product not found.");
    return product;
  }

  public async update(id: string, changes: Partial<IProduct>) {
    let index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      let product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
    } else throw new Error("Product not found.");
  }

  public async delete(id: string){
    let index = this.products.findIndex(product => product.id === id);
    if (index !== -1) this.products.splice(index, 1);
    else throw new Error("Product not found.");
  }
}
