import { ICategory } from "../models/ICategory";
import { v4 as uuidv4 } from "uuid";

export class categoryService
{
  private static instance: categoryService;

  private categories: ICategory[] = [];

  private constructor()
  {
    this.initialize();
  }

  static getInstance(): categoryService
  {
    if (this.instance === null || this.instance === undefined) this.instance = new categoryService();
    return this.instance;
  }

  private initialize(): void
  {
    for (let i = 0; i < 10; i++){
      let category: ICategory = {
        id: uuidv4(),
        name: "Category " + i,
      };
      this.categories.push(category);
    }
  }

  public async create(name: string): Promise<ICategory>
  {
    let newCategory: ICategory = {
      id: uuidv4(),
      name: name,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  public async delete(id: string): Promise<ICategory>
  {
    let deletedCategory: ICategory[] = [];
    let index = this.categories.findIndex(category => category.id === id);
    if (index !== -1) deletedCategory = this.categories.splice(index, 1);
    else throw new Error("Category not found");
    return deletedCategory[0];
  }

  public async update(id: string, changes: string) {
    let index = this.categories.findIndex(category => category.id === id);
    if (index !== -1) this.categories[index].name = changes;
    else throw new Error("Category not found.");
  }

  public async toList(): Promise<ICategory[]>
  {
    return this.categories;
  }
}
