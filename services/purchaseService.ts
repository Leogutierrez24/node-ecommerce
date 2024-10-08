import { IPurchase } from "../models/IPurchase";
import { IServiceMapper } from "../models/IServiceMapper";


export class purchaseService implements IServiceMapper<IPurchase>
{
  create(name: string): IPurchase {
    throw new Error("Method not implemented.");
  }
  delete(id: number): IPurchase {
    throw new Error("Method not implemented.");
  }
  update(id: number, changes: Partial<IPurchase>): IPurchase {
    throw new Error("Method not implemented.");
  }
  toList(): IPurchase[] {
    throw new Error("Method not implemented.");
  }

}
