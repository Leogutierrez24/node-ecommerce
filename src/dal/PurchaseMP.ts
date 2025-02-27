import { Mapper } from "./Mapper";
import { IPurchase } from "../models/IPurchase";

export class PurchaseMP extends Mapper<IPurchase> {
  public update(id: number, obj: Partial<IPurchase>): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
  public async insert(obj: IPurchase): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
  public delete(id: number): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
  public toList(): Promise<IPurchase[]> {
    throw new Error("Method not implemented.");
  }
  public getById(id: number): Promise<IPurchase | undefined> {
    throw new Error("Method not implemented.");
  }

  public async getByUser(userID: number): {
    throw new Error("Method not implemented.");
  }

}
