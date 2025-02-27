import { ErrorPasswordNotMatch } from "../errors/ErrorPasswordNotMatch";
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
      if (actualPassword !== newPassword) {
        const result = await this.userMapper.updatePassword(id, newPassword);
        if (result && result === 0) throw new DatabaseError("Failed to change password.");
      } else throw new Error("The new password has to be different to the current.");
    }
  }

  public async toList(): Promise<IUser[]> {
    const users = await this.userMapper.toList();
    if (users) return users;
    else throw new DatabaseError("Failed to fetch the users from database.");
  }

  public async findById(id: number): Promise<IUser> {
    const result = await this.userMapper.getById(id);
    if (result) return result;
    else throw new NotFoundError(`User not found with ID: ${id}.`);
  }
}
