import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";
import { ProductMP } from "../dal/ProductMP";
import { NotFoundError } from "../errors/NotFoundError";
import { DatabaseError } from "../errors/DatabaseError";

export class ProductService {
  private static instance: ProductService;

  private productMapper = new ProductMP();

  private constructor() { }

  public static getInstance(): ProductService {
    if (this.instance === null || this.instance === undefined) this.instance = new ProductService();
    return this.instance;
  }

  /*public async listByCategory(categoryId: string): Promise<void> {

  }*/

  public async findById(id: number) {
    const product = await this.productMapper.getById(id);
    if (product) return product;
    else throw new NotFoundError("Product not found with ID: " + id);
  }

  public async create(name: string, price: number, categories: ICategory[] = []): Promise<IProduct> {
    let newProduct: IProduct = {
      name: name,
      price: price,
      categories: categories
    };
    let result: number | null = await this.productMapper.insert(newProduct);
    if (result && result !== 0) return newProduct;
    else throw new DatabaseError("The product creation has failed.");
  }

  public async toList() {
    const products = await this.productMapper.toList();
    if (!products) throw new DatabaseError("Failed to fetch the products from database.");
    else return products;
  }

  public async update(id: number, changes: Partial<IProduct>) {
    let productExists = await this.findById(id);
    if (productExists) {
      const result = await this.productMapper.update(id, changes);
      if (result && result === 0) throw new Error("It was not possible to update.");
    }
  }

  public async delete(id: number) {
    const productExists = await this.productMapper.getById(id);
    if (productExists) {
      const result = await this.productMapper.delete(id);
      if (result === 0) throw new DatabaseError("Failed to delete product with ID:" + id);
    }
  }
}
