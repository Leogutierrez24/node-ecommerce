import { Mapper } from "./Mapper";
import { IUser } from "../models/IUser";
// import { getConnection } from "../lib/postgres";

export class userMP extends Mapper<IUser> {
  public async update(obj: IUser) {
    throw new Error("Method not implemented.");
  }

  public async insert(obj: IUser) {
    throw new Error("Method not implemented.");
  }

  public async delete(id: number) {
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
