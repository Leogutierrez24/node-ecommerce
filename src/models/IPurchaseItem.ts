import { IProduct } from "./IProduct";

export interface IPurchaseItem {
  product: IProduct,
  quantity: number,
  price: number
}
