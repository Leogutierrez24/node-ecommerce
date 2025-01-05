import { Mapper } from "./Mapper";
import { IUser } from "../models/IUser";
import { getConnection } from "../lib/postgres";

export class userMP extends Mapper<IUser> {
  public async Update(obj: IUser) {
    throw new Error("Method not implemented.");
  }

  public async Insert(obj: IUser) {
    throw new Error("Method not implemented.");
  }

  public async Delete(id: number) {
    throw new Error("Method not implemented.");
  }

  public async toList(): Promise<IUser[]> {
    const client = await getConnection();
    const data = await client.query("SELECT * FROM user");
    return data.rows;
  }

}
