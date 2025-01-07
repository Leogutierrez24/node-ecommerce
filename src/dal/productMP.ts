import { IProduct } from "../models/IProduct";
import { Mapper } from "./Mapper";
// import { getConnection } from "../lib/postgres";
import { pool } from "../lib/postgres";

export class productMP extends Mapper<IProduct> {
  public async update(obj: IProduct): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async insert(obj: IProduct): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async toList(): Promise<IProduct[]> {
    // const client = await getConnection();
    // const data = await client.query("SELECT * FROM product;");
    // return data.rows;

    const query = "SELECT * FROM product;";
    const data = await this.pool.query(query);
    return data.rows;
  }

}
