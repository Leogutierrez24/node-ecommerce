import { IProduct } from "./IProduct";

export interface IPurchase
{
  id: number;
  date: Date;
  products: IProduct[];
  total: number;
}
