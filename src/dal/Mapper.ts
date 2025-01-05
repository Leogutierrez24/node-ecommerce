export abstract class Mapper<T> {
  public abstract Update(obj: T): Promise<void>;

  public abstract Insert(obj: T): Promise<void>;

  public abstract Delete(id: number): Promise<void>;

  public abstract toList(): Promise<T[]>;
}
