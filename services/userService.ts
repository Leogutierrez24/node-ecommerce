import { IUser } from "../models/IUser";

export class userService {
  private users: IUser[] = []

  private static instance: userService;

  private constructor() {
    this.initilize();
  }

  public static getInstance() {
    if (this.instance == null) this.instance = new userService();
    return this.instance;
  }

  private initilize() {
    let newUser: IUser = { id: Date.now(), user: "admin", password: "admin", purchases: [] };
    this.users.push(newUser);
  }

  public async create(username: string, password: string): Promise<IUser> {
    let newUser: IUser = {
      id: Date.now(),
      user: username,
      password: password,
      purchases: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  public async delete(id: number) {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) this.users.splice(index, 1);
    else throw new Error("User not found.");
  }

  public async changePassword(id: number, newPassword: string) {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) this.users[index].password = newPassword;
    else throw new Error("User not found.");
  }

  public async toList(): Promise<IUser[]> {
    return this.users;
  }

}
