import { Mapper } from "./Mapper";
import { IPurchase } from "../models/IPurchase";
import { IPurchaseItem } from "../models/IPurchaseItem";
import { IProduct } from "../models/IProduct";

export class PurchaseMP extends Mapper<IPurchase> {
  public update(id: number, obj: Partial<IPurchase>): Promise<number | null> {
    throw new Error("Method not implemented.");
  }

  public async insert(obj: IPurchase): Promise<number | null> {
    throw new Error("Method not implemented.");
  }

  public async insertPurchase(purchase: IPurchase, userID: number) {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");
      const queryPurchase = "INSERT INTO purchase (date, total, id_user) VALUES ($1, $2, $3) RETURNING id_purchase";
      const res = Number.parseInt((await client.query(queryPurchase, [purchase.date, purchase.total, userID])).rows[0].id_purchase);

      const queryData = purchase.products.map((p => {
        return `(${res}, ${p.product.id}, ${p.quantity}, ${p.product.price})`;
      })).join(", ");

      const queryPurchaseItems = `INSERT INTO product_sold (id_purchase, id_product, quantity, price) VALUES ${queryData}`;
      const result = await client.query(queryPurchaseItems);
      await client.query("COMMIT");
      return result.rowCount;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  public delete(id: number): Promise<number | null> {
    throw new Error("Method not implemented.");
  }

  public toList(): Promise<IPurchase[]> {
    throw new Error("Method not implemented.");
  }

  public async getById(id: number): Promise<IPurchase | undefined> {
    const query = "SELECT pr.id_purchase, pr.date, pr.total, p.id_product, p.name, ps.price, ps.quantity FROM purchase pr JOIN product_sold ps ON pr.id_purchase = ps.id_purchase JOIN product p ON p.id_product = ps.id_product WHERE pr.id_purchase = $1";
    const data = (await this.pool.query(query, [id])).rows;
    let purchase = undefined;

    if (data.length >= 0) {
      purchase = {
        id: Number.parseInt(data[0].id_purchase),
        date: data[0].date,
        products: this.mapPurchaseItems(data),
        total: data[0].total
      };
    }

    return purchase;
  }

  private mapPurchaseItems(rows: any[]): IPurchaseItem[] {
    let purchaseItems: IPurchaseItem[] = [];

    rows.forEach(row => {
      const item: IPurchaseItem = {
        product: {
          id: Number.parseInt(row.id_product),
          name: row.name,
          price: Number.parseFloat(row.price),
          categories: []
        },
        quantity: Number.parseInt(row.quantity),
        price: Number.parseFloat(row.price)
      };
      purchaseItems.push(item);
    });

    return purchaseItems;
  }


  public async getAllByUserId(userID: number): Promise<IPurchase[]> {
    let purchasesList: IPurchase[] = [];
    let productsList: IProduct[] = [];

    const query = `SELECT pr.id_purchase, pr.date, pr.total, p.id_product, p.name, ps.price, ps.quantity FROM purchase pr JOIN product_sold ps ON pr.id_purchase = ps.id_purchase JOIN product p ON p.id_product = ps.id_product WHERE pr.id_user = $1`;
    const data = (await this.pool.query(query, [userID])).rows;

    if (data.length > 0) {
      data.forEach(row => {
        const index = purchasesList.findIndex(p => p.id === Number.parseInt(row.id_purchase))
        if (index === -1) {
          const purchase: IPurchase = {
            id: Number.parseInt(row.id_purchase),
            date: row.date,
            products: [{
              product: this.checkProduct(productsList, row),
              quantity: Number.parseInt(row.quantity),
              price: Number.parseFloat(row.price)
            }],
            total: Number.parseFloat(row.total)
          }
          purchasesList.push(purchase);
        } else {
          purchasesList[index].products.push({
            product: this.checkProduct(productsList, row),
              quantity: Number.parseInt(row.quantity),
              price: Number.parseFloat(row.price)
          });
        }
      });
    }

    return purchasesList;
  }

  private checkProduct(products: IProduct[], row: any): IProduct {
    const productID = Number.parseInt(row.id_product);
    const index = products.findIndex(p => p.id === Number.parseInt(row.id_product));
    let product: IProduct;
    if (index === -1) {
       product = {
        id: productID,
        name: row.name,
        price: Number.parseFloat(row.price),
        categories: []
      }
      products.push(product);
    } else product = products.find(p => p.id === productID)!;

    return product;
  }
}
