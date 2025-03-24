import { PasswordError } from "../errors/PasswordError";
import { IUser } from "../models/IUser";
import { UserMP } from "../dal/UserMP";
import { NotFoundError } from "../errors/NotFoundError";
import { DatabaseError } from "../errors/DatabaseError";

export class UserService {
  private userMapper = new UserMP();

  private static instance: UserService;

  private constructor() {  }

  public static getInstance(): UserService {
    if (this.instance === null || this.instance === undefined) this.instance = new UserService();
    return this.instance;
  }

  public async create(username: string, password: string): Promise<IUser> {
    let newUser: IUser = {
      email: username,
      password: password,
      purchases: [],
    };
    const result = await this.userMapper.insert(newUser);
    if (result && result !== 0) return newUser;
    else throw new DatabaseError("The user creation has failed.");
  }

  public async delete(id: number) {
    const userToDelete = await this.findById(id);
    if (userToDelete) {
      const result = await this.userMapper.delete(id);
      if (result && result === 0) throw new DatabaseError(`Failed to delete user with ID: ${id}.`);
    }
  }

  public async changePassword(id: number, actualPassword: string, newPassword: string) {
    const user = await this.userMapper.getById(id);
    if (user) {
      if (user.password === actualPassword) {
        if (actualPassword !== newPassword) {
          const result = await this.userMapper.updatePassword(id, newPassword);
          if (result && result === 0) throw new DatabaseError("Failed to change password.");
        } else throw new PasswordError("The new password has to be different to the current.");
      } else throw new PasswordError("Wrong user/password. Try again.");
    }
  }

  public async toList(): Promise<IUser[]> {
    const users = await this.userMapper.toList();
    if (users) return users;
    else throw new DatabaseError("Failed to fetch the users from database.");
  }

  public async findById(id: number): Promise<IUser> {
    const result = await this.userMapper.getById(id);
    if (result && result !== undefined) return result;
    else throw new NotFoundError(`User not found with ID: ${id}.`);
  }

  public async exists(id: number): Promise<boolean> {
    const data = await this.userMapper.find(id);
    let result = false;
    if (data !== 0) result = true;
    return result;
  }
}
