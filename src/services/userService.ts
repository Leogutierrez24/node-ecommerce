import { ErrorPasswordNotMatch } from "../errors/ErrorPasswordNotMatch";
import { IUser } from "../models/IUser";
import { v4 as uuidv4 } from "uuid";
import { userMP } from "../dal/userMP";
import { NotFoundError } from "../errors/NotFoundError";

export class UserService {
  private users: IUser[] = []

  private userMapper = new userMP();

  private static instance: UserService;

  private constructor() {
    this.initilize();
  }

  public static getInstance(): UserService {
    if (this.instance === null || this.instance === undefined) this.instance = new UserService();
    return this.instance;
  }

  private initilize() {
    let newUser: IUser = { id: "42ad95ca-27a9-452b-ba48-2a162224d360", email: "admin", password: "admin", purchases: [] };
    this.users.push(newUser);
  }

  public async create(username: string, password: string): Promise<IUser> {
    let newUser: IUser = {
      id: uuidv4(),
      email: username,
      password: password,
      purchases: [],
    };
    this.users.push(newUser);
    return newUser;
  }

  public async delete(id: string) {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) this.users.splice(index, 1);
    else throw new NotFoundError("User not found with ID: " + id);
  }

  public async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.findById(id);
    if (user !== undefined) {
      if (oldPassword === user.password) user.password = newPassword;
      else throw new ErrorPasswordNotMatch();
    }
    else throw new NotFoundError("User not found with ID: " + id);
  }

  public async toList(): Promise<IUser[]> {
    return this.userMapper.toList();
  }

  public async findById(id: string): Promise<IUser> {
    let index: number = this.users.findIndex(user => user.id === id);
    if (index !== -1) return this.users[index];
    else throw new NotFoundError("User not found with ID: " + id);
  }
}
