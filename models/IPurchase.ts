import { IProduct } from "./IProduct";

export interface IPurchase
{
  id: string;
  date: string;
  products: IProduct[];
  total: number;
}
