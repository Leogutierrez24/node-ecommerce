export interface IServiceMapper<T>
{
  create(name: string): T;

  delete(id: number): T;

  update(id: number, changes: Partial<T>): T;

  toList(): T[];
}
