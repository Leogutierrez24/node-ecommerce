import { NotFoundError } from "../errors/NotFoundError";
import { DatabaseError } from "../errors/DatabaseError";
import { IPurchaseItem } from "../models/IPurchaseItem";
import { Cart } from "./Cart";
import { IPurchase } from "../models/IPurchase";
import { PurchaseMP } from "../dal/PurchaseMP";
import { UserService } from "./UserService";

export class PurchaseService {
  private static instance: PurchaseService;

  private mapper: PurchaseMP;

  private constructor() {
    this.mapper = new PurchaseMP();
  }

  public static getInstance() {
    if (this.instance === null || this.instance === undefined) this.instance = new PurchaseService();
    return this.instance;
  }

  public async create(cart: Cart, userID: number): Promise<number | null> {
    let result;

    if (cart.get().length !== 0) {
      const time = new Date();
      const newPurchase: IPurchase = {
        date: time.toDateString(),
        products: cart.get(),
        total: cart.getTotal()
      };

      result = await this.mapper.insertPurchase(newPurchase, userID);
    } else result = -1;

    if (result && result === 0) throw new DatabaseError("The purchase creation has failed.");
    else if (result && result === -1) throw new Error("For create a new purchase, the cart requires have 1 or more products.");
    else return result;
  }

  public async findById(id: number): Promise<IPurchase> {
    const purchaseExists = await this.mapper.getById(id);
    if (purchaseExists) return purchaseExists;
    else throw new NotFoundError(`Purchase not found with ID: ${id}.`);
  }

  public async getUserPurchases(userID: number): Promise<IPurchase[]> {
    const userService = UserService.getInstance();
    if (await userService.exists(userID)) {
      return await this.mapper.getAllByUserId(userID);
    } else throw new NotFoundError(`User not found with ID: ${userID}.`);
  }

}
