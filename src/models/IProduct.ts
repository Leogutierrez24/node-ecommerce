import { ICategory } from "./ICategory";

export interface IProduct
{
  id?: string;
  name: string;
  price: number;
  categories: ICategory[];
}
