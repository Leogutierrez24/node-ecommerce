import { IProduct } from "../models/IProduct";

export class ProductService
{
  public products: IProduct[] = [];

  constructor()
  {
    this.generate();
  }

  generate()
  {
    const limit = 100;
    if (typeof limit === "number")
    {
      for(let i = 0; i < limit; i++)
        {
          this.products.push({
            id: i,
            name: "Product " + i,
            price: 1500,
            categories: [],
          });
        }
    }
  }

  create()
  {

  }

  toList()
  {
    return this.products;
  }

  findById(id: number)
  {
    return this.products.find(product => product.id === id);
  }

  update()
  {

  }

  delete()
  {

  }
}
