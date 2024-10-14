import { ICategory } from "../models/ICategory";

export class categoryService
{
  private static instance: categoryService;

  private categories: ICategory[] = [];

  private constructor()
  {
    this.initialize();
  }

  static getInstance()
  {
    if (this.instance == null) this.instance = new categoryService();
    return this.instance;
  }

  private initialize(): void
  {
    for (let i = 0; i < 10; i++){
      let category: ICategory = {
        id: Date.now(),
        name: "Category " + i,
      };
      this.categories.push(category);
    }
  }

  public async create(name: string): Promise<ICategory>
  {
    let newCategory: ICategory = {
      id: Date.now(),
      name: name,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  public async delete(id: number): Promise<ICategory>
  {
    let deletedCategory: ICategory[] = [];
    let index = this.categories.findIndex(category => category.id === id);
    if (index !== -1) deletedCategory = this.categories.splice(index, 1);
    else throw new Error("Category not found");
    return deletedCategory[0];
  }

  public async update(id: number, changes: string) {
    let index = this.categories.findIndex(category => category.id === id);
    if (index !== -1) this.categories[index].name = changes;
    else throw new Error("Category not found.");
  }

  public async toList(): Promise<ICategory[]>
  {
    return this.categories;
  }
}
