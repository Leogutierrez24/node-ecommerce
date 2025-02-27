import { IProduct } from "../models/IProduct";
import { Mapper } from "./Mapper";

export class ProductMP extends Mapper<IProduct> {
  public async update(id: number, obj: Partial<IProduct>): Promise<number | null> {
    const queryData = Object.entries(obj).map(([key, value]) => {
      return `${key} = ${value}`;
    }).join(', ');
    const query = `UPDATE product SET ${queryData} WHERE id_product = ${id};`;
    const data = await this.pool.query(query);
    return data.rowCount;
  }

  public async insert(obj: IProduct): Promise<number | null> {
    const query = "INSERT INTO product (name, price) VALUES ($1, $2);";
    const values = [obj.name, obj.price];
    const data = await this.pool.query(query, values);
    return data.rowCount;
  }

  public async delete(id: number): Promise<number | null> {
    const query = "DELETE FROM product WHERE id_product = $1;";
    const data = await this.pool.query(query, [id]);
    return data.rowCount;
  }

  public async getById(id: number): Promise<IProduct | undefined> {
    const query = "SELECT p.id_product, p.name AS product_name, p.price, c.id_category, c.name AS category_name FROM product p LEFT JOIN category_products cp ON cp.id_product = p.id_product LEFT JOIN category c ON c.id_category = cp.id_category WHERE p.id_product = $1;";
    const data = (await this.pool.query(query, [id])).rows;
    if (data.length > 0) {
      let product: IProduct = {
        id: data[0].id_product,
        name: data[0].product_name,
        price: data[0].price,
        categories: []
      };

      if (data[0].id_category) {
        product!.categories.push({
          id: data[0].id_category,
          name: data[0].category_name
        });
      }

      return product;
    } else return undefined;
  }

  public async toList(): Promise<IProduct[]> {
    const query = "SELECT product.id_product, product.name AS product_name, product.price, category.id_category, category.name AS category_name FROM product LEFT JOIN category_products cp ON cp.id_product = product.id_product LEFT JOIN category ON category.id_category = cp.id_category ORDER BY category.id_category;";
    const data = await this.pool.query(query);
    const products = this.mapProducts(data.rows);
    return products;
  }

  private mapProducts(rows: any[]): IProduct[] {
    const productsMap = new Map<number, IProduct>();

    rows.forEach(row => {
      if (!productsMap.has(row.id_product)) {
        productsMap.set(row.id_product, {
          id: row.id_product,
          name: row.product_name,
          price: row.price,
          categories: []
        });
      }

      if (row.id_category) {
        productsMap.get(row.id_product)!.categories.push({
          id: row.id_category,
          name: row.category_name
        });
      }
    });
    return Array.from(productsMap.values());
  }
}
