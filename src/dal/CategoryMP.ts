import { resourceUsage } from "process";
import { ICategory } from "../models/ICategory";
import { Mapper } from "./Mapper";

export class CategoryMP extends Mapper<ICategory> {
  public update(id: number, obj: Partial<ICategory>): Promise<number | null> {
    throw new Error("Method not implemented.");
  }

  public async updateName(id: number, newName: string): Promise<number | null> {
    const query = `UPDATE category SET name = $1 WHERE id_category = $2;`;
    const data = await this.pool.query(query, [newName, id]);
    return data.rowCount;
  }

  public async insert(obj: ICategory): Promise<number | null> {
    const query = `INSERT INTO category (name) VALUES ($1);`
    const data = await this.pool.query(query, [obj.name]);
    return data.rowCount;
  }

  public async delete(id: number): Promise<number | null> {
    const query = `DELETE FROM category USING category_products WHERE category.id_category = category_products.id_category AND category.id_category = $1;`;
    return (await this.pool.query(query, [id])).rowCount;
  }

  public async toList(): Promise<ICategory[]> {
    const query = `SELECT * FROM category;`
    const data = (await this.pool.query(query)).rows;
    let categories: ICategory[] = [];
    data.forEach(row => {
      if (row.id_category) {
        categories.push({
          id: row.id_category,
          name: row.name
        });
      }
    });
    return categories;
  }

  public async getById(id: number): Promise<ICategory | undefined> {
    let query = `SELECT * FROM category WHERE id_category = $1;`;
    const data = (await this.pool.query(query, [id])).rows;
    if (data.length > 0) {
      const category: ICategory = {
        id: data[0].id_category,
        name: data[0].name,
      };
      return category;
    } else return undefined;
  }

}
