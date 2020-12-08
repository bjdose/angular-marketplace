import { UserType } from '@app/core/enums';
import { User } from '@app/core/models';

export const users: User[] = [
  new User(1, 'admin@admin.com', UserType.Admin, '123456'),
  new User(2, 'customer@customer.com', UserType.Customer, '123456'),
  new User(3, 'seller@seller.com', UserType.Seller, '123456'),
  new User(4, 'seller2@seller.com', UserType.Seller, '123456'),
  new User(5, 'seller3@seller.com', UserType.Seller, '123456'),
];
