import { ICategory } from "./ICategory";

export interface IProduct
{
  id: number;
  name: string;
  price: number;
  categories: ICategory[];
}
