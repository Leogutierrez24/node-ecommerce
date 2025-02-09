import { CategoryMP } from "../dal/CategoryMP";
import { DatabaseError } from "../errors/DatabaseError";
import { NotFoundError } from "../errors/NotFoundError";
import { ICategory } from "../models/ICategory";

export class CategoryService {
  private static instance: CategoryService;

  private mapper: CategoryMP;

  private constructor() {
    this.mapper = new CategoryMP();
  }

  static getInstance(): CategoryService {
    if (this.instance === null || this.instance === undefined) this.instance = new CategoryService();
    return this.instance;
  }

  public async create(name: string): Promise<ICategory> {
    let newCategory: ICategory = {
      name: name,
    };
    const result = await this.mapper.insert(newCategory);
    if(result && result !== 0) return newCategory;
    else throw new DatabaseError("The category creation has failed.");
  }

  public async delete(id: number) {
    const categoryExists = await this.getById(id);
    if (categoryExists) {
      const result = await this.mapper.delete(id);
      if (result === 0) throw new DatabaseError("Failed to delete category with ID:" + id);
      else return id;
    }
  }

  public async update(id: number, changes: string) {
    const categoryExists = await this.getById(id);
    if (categoryExists) {
      const result = await this.mapper.updateName(id, changes);
      if (result && result === 0) throw new DatabaseError("It was not possible to update.");
    }
  }

  public async toList(): Promise<ICategory[]> {
    const result = await this.mapper.toList();
    if(result) return result;
    else throw new DatabaseError("Failed to fetch categories from database.");
  }

  public async getById(id: number) {
    const category = await this.mapper.getById(id);
    if (category && category !== undefined) return category;
    else throw new NotFoundError("Category not founded with ID: " + id);
  }
}
