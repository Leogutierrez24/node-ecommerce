import { NotFoundError } from "../errors/NotFoundError";
import { DatabaseError } from "../errors/DatabaseError";
import { IProduct } from "../models/IProduct";
import { IPurchase } from "../models/IPurchase";
import { PurchaseMP } from "../dal/PurchaseMP";

export class purchaseService {
  private static instance: purchaseService;

  private mapper: PurchaseMP;

  private constructor() {
    this.mapper = new PurchaseMP();
  }

  public static getInstance() {
    if (this.instance === null || this.instance === undefined) this.instance = new purchaseService();
    return this.instance;
  }

  public async create(products: IProduct[]): Promise<number | null> {
    let newPurchase: IPurchase = {
      date: Date.toString(),
      products: products,
      total: products.reduce((total, product) => total + product.price, 0)
    };
    const result = await this.mapper.insert(newPurchase);
    if (result && result === 0) throw new DatabaseError("The purchase creation has failed.");
    else return result;
  }

  public async findById(id: number): Promise<IPurchase> {
    const purchaseExists = await this.mapper.getById(id);
    if (purchaseExists) return purchaseExists;
    else throw new NotFoundError(`Purchase not found with ID: ${id}.`);
  }

  public async getAllByUser(userID: number): Promise<IPurchase[]> {
    const purchases = await this.mapper.getByUser(userID);
    if (purchases) {

    }
  }

}
