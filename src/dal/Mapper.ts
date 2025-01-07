import { pool } from "../lib/postgres";

export abstract class Mapper<T> {
  public pool = pool;

  public constructor() {
    this.pool.on("error", (error) => console.log(error));
  }

  public abstract update(obj: T): Promise<void>;

  public abstract insert(obj: T): Promise<void>;

  public abstract delete(id: number): Promise<void>;

  public abstract toList(): Promise<T[]>;
}
