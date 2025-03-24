import { IPurchaseItem } from "./IPurchaseItem";

export interface IPurchase
{
  id?: number;
  date: string;
  products: IPurchaseItem[];
  total: number;
}
