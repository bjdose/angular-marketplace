import { User } from './user.model';

export class Product {
  sku: string;
  name: string;
  price: number;
  quantity: number;
  user: User;
  constructor(
    sku: string,
    name: string,
    price: number,
    quantity: number,
    user: User
  ) {
    this.sku = sku;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.user = user;
  }
}
