import { Category } from "./category";

export class Training {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity:number;
    category: Category = new Category(0, "");
  
    constructor(id: number = 0, name: string, description: string, price: number, quantity:number = 1, category: Category) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
      this.category =category;
    }
}
