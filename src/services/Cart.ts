import { IPurchaseItem } from "../models/IPurchaseItem";

export class Cart {
  private products: IPurchaseItem[];

  constructor(products: IPurchaseItem[] = []) {
    this.products = products;
  }

  get () {
    return this.products;
  }

  public addProduct(product: IPurchaseItem): void {
    this.products.push(product);
  }

  public removeProduct(product: IPurchaseItem): void {
    const index = this.products.findIndex(p => p.product!.id === product.product.id);
    this.products.splice(index, 1);
  }

  public getTotal(): number {
    return this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }
}
