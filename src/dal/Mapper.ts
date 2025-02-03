import { pool } from "../lib/postgres";

export abstract class Mapper<T> {
  public pool = pool;

  public constructor() {
    this.pool.on("error", (error) => console.log(error));
  }

  public abstract update(id: number, obj: Partial<T>): Promise<number | null>;

  public abstract insert(obj: T): Promise<number | null>;

  public abstract delete(id: number): Promise<number | null>;

  public abstract toList(): Promise<T[]>;

  public abstract getById(id: number): Promise<T | null>;
}
