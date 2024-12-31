import { ErrorUserNotFound } from "../errors/ErrorUserNotFound";
import { IUser } from "../models/IUser";
import { v4 as uuidv4 } from "uuid";

export class userService {
  private users: IUser[] = []

  private static instance: userService;

  private constructor() {
    this.initilize();
  }

  public static getInstance(): userService {
    if (this.instance === null || this.instance === undefined) this.instance = new userService();
    return this.instance;
  }

  private initilize() {
    let newUser: IUser = { id: uuidv4(), user: "admin", password: "admin", purchases: [] };
    this.users.push(newUser);
  }

  public async create(username: string, password: string): Promise<IUser> {
    let newUser: IUser = {
      id: uuidv4(),
      user: username,
      password: password,
      purchases: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  public async delete(id: string) {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) this.users.splice(index, 1);
    else throw new ErrorUserNotFound();
  }

  public async changePassword(id: string, newPassword: string) {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) this.users[index].password = newPassword;
    else throw new ErrorUserNotFound();
  }

  public async toList(): Promise<IUser[]> {
    return this.users;
  }

  public async findById(id: string): Promise<IUser> {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) return this.users[index];
    else throw new ErrorUserNotFound();
  }

}
