import { IServiceMapper } from "../models/IServiceMapper";
import { IUser } from "../models/IUser";

export class userService implements IServiceMapper<IUser>
{
  create(name: string): IUser {
    throw new Error("Method not implemented.");
  }
  delete(id: number): IUser {
    throw new Error("Method not implemented.");
  }
  update(id: number, changes: Partial<IUser>): IUser {
    throw new Error("Method not implemented.");
  }
  toList(): IUser[] {
    throw new Error("Method not implemented.");
  }

}
