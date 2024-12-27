import { IProduct } from "../models/IProduct";
import { IPurchase } from "../models/IPurchase";

export class purchaseService
{
  private purchases: IPurchase[] = [];

  private static instance: purchaseService;

  private constructor() {  }

  public static getInstance()
  {
    if (this.instance === null || this.instance === undefined) this.instance = new purchaseService();
    return this.instance;
  }

  public async create(products: IProduct[]): Promise<IPurchase> {
    let newPurchase: IPurchase = {
      id: Date.now(),
      date: Date.toString(),
      products: products,
      total: products.reduce((total, product) => total + product.price, 0)
    };
    return newPurchase;
  }

  public async findById(id: number): Promise<IPurchase>
  {
    let purchase: IPurchase;
    let index = this.purchases.findIndex(purchase => purchase.id === id);
    if (index !== -1) purchase = this.purchases[index];
    else throw new Error("Purchase not found.");
    return purchase;
  }

  public async toList(): Promise<IPurchase[]> {
    return this.purchases;
  }

}
