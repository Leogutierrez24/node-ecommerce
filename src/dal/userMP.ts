import { Mapper } from "./Mapper";
import { IUser } from "../models/IUser";

export class UserMP extends Mapper<IUser> {
  public async update(id: number, obj: Partial<IUser>): Promise<number | null> {
    const queryData = Object.entries(obj).map(([key, value]) => {
      return `${key} = ${value}`;
    }).join(', ');
    const query = `UPDATE users SET ${queryData} WHERE id_user = ${id};`;
    const result = await this.pool.query(query);
    return result.rowCount;
  }

  public async updatePassword(id: number, newPassword: string): Promise<number | null> {
    const query = `UPDATE users SET password = $1 WHERE users.id = $2;`;
    const result = await this.pool.query(query, [newPassword, id]);
    return result.rowCount;
  }

  public async insert(obj: IUser): Promise<number | null> {
    const query = "INSERT INTO users (email, password) VALUES ($1, $2);";
    const result = await this.pool.query(query, [obj.email, obj.password])
    return result.rowCount;
  }

  public async getById(id: number): Promise<IUser | undefined> {
    const query = `SELECT * FROM users WHERE id = $1;`;
    const data = (await this.pool.query(query, [id])).rows[0];
    const user = {
      id: data.id,
      email: data.email,
      password: data.password
    };
    return user;
  }

  public async delete(id: number): Promise<number | null> {
    const query = `DELETE FROM users WHERE users.id = $1;`;
    const result = await this.pool.query(query, [id]);
    return result.rowCount;
  }

  public async toList(): Promise<IUser[]> {
    const query = "SELECT id, email FROM users;";
    const data = await this.pool.query(query);
    const users = this.mapUsers(data.rows);
    return users;
  }

  private mapUsers(rows: any[]): IUser[] {
    const users: IUser[] = [];
    rows.forEach(row => {
      users.push({
        id: row.id,
        email: row.email,
      });
    });
    return users;
  }

}
