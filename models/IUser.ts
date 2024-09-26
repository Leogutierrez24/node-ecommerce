import { IPurchase } from "./IPurchase";

export interface IUser
{
  id: number;
  user: string;
  password: string;
  purchases: IPurchase[];
}
