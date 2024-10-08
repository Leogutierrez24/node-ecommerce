import { ICategory } from "../models/ICategory";

export class categoryService
{
  private static instance: categoryService;

  private categories: ICategory[] = [];

  private constructor()
  {

  }

  static getInstance()
  {
    if (this.instance == null) this.instance = new categoryService();
    return this.instance;
  }

  private initialize(): void
  {

  }

  public create(name: string)
  {

  }

  public delete(id: number)
  {

  }

  public update(id: number, changes: Partial<ICategory>)
  {

  }

  public toList(): ICategory[]
  {
    return this.categories;
  }

}
