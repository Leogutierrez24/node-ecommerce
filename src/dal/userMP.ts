import { Mapper } from "./Mapper";
import { IUser } from "../models/IUser";
// import { getConnection } from "../lib/postgres";

export class userMP extends Mapper<IUser> {
  public update(id: number, obj: Partial<IUser>): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
  public insert(obj: IUser): Promise<number | null> {
    throw new Error("Method not implemented.");
  }
  public getById(id: number): Promise<IUser | undefined> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: number): Promise<number | null> {
    throw new Error("Method not implemented.");
  }

  public async toList(): Promise<IUser[]> {
    // const client = await getConnection();
    // const data = await client.query("SELECT * FROM user");
    // return data.rows;
    const query = "SELECT * FROM user;";
    const data = await this.pool.query(query);
    return data.rows;
  }

}
