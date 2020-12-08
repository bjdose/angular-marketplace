import { Product, User } from '../../models';
import { UserType } from './../../enums/user-type.enum';

export const products: Product[] = [
  new Product(
    '1A',
    'First product',
    1000,
    10,
    new User(3, 'seller@seller.com', UserType.Seller)
  ),
  new Product(
    '1B',
    'Second product',
    1200,
    20,
    new User(3, 'seller@seller.com', UserType.Seller)
  ),
  new Product(
    '1B',
    'Second product',
    2400,
    20,
    new User(4, 'seller2@seller.com', UserType.Seller)
  ),
  new Product(
    '1C',
    'Third product',
    200,
    25,
    new User(5, 'seller3@seller.com', UserType.Seller)
  ),
  new Product(
    '1D',
    'Third product',
    5700,
    35,
    new User(5, 'seller3@seller.com', UserType.Seller)
  ),
];
