export class Training {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity:number;
  
    constructor(id: number = 0, name: string, description: string, price: number, quantity:number = 1) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
    }
}
