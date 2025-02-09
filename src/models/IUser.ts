import { IPurchase } from "./IPurchase";

export interface IUser
{
  id: string;
  email: string;
  password: string;
  purchases: IPurchase[];
}
