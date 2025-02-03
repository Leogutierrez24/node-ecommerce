import { NotFoundError } from "../errors/NotFoundError";
import { IProduct } from "../models/IProduct";
import { IPurchase } from "../models/IPurchase";
import { v4 as uuidv4 } from "uuid";

export class purchaseService {
  private static instance: purchaseService;

  private constructor() { }

  public static getInstance() {
    if (this.instance === null || this.instance === undefined) this.instance = new purchaseService();
    return this.instance;
  }

  public async create(products: IProduct[]): Promise<IPurchase> {
    let newPurchase: IPurchase = {
      id: uuidv4(),
      date: Date.toString(),
      products: products,
      total: products.reduce((total, product) => total + product.price, 0)
    };
    return newPurchase;
  }

  public async findById(purchases: IPurchase[], id: string): Promise<IPurchase> {
    let index = purchases.findIndex(purchase => purchase.id === id);
    if (index !== -1) return purchases[index];
    else throw new NotFoundError("Purchase not found with ID: " + id);
  }

}
