import { IPurchase } from "./IPurchase";

export interface IUser
{
  id: string;
  user: string;
  password: string;
  purchases: IPurchase[];
}
