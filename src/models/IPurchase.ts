import { IProduct } from "./IProduct";

export interface IPurchase
{
  id?: number;
  date: string;
  products: IProduct[];
  total: number;
}
