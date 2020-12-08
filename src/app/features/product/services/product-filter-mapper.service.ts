import { Injectable } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { Product, User } from '@app/core/models';
import { uniqueValues } from '@app/core/utils';
import {
  SelectionFilterData,
  SelectionFilterOption,
  SliderFilterData,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterMapperService {
  productSellersMapper(products: Product[]): User[] {
    const uniqueUsers = uniqueValues(
      products.map((__) => __.user),
      'id'
    );
    return uniqueUsers;
  }

  selectionFilterDataMapper(products: Product[]): SelectionFilterData {
    const options: SelectionFilterOption[] = this.productSellersMapper(
      products
    ).map(
      (user) => ({ value: user.id, label: user.email } as SelectionFilterOption)
    );

    return {
      subheader: 'Vendedores',
      options,
    };
  }

  sliderFilterDataMapper(): SliderFilterData {
    return {
      subheader: 'Precios',
      tickInterval: 1000,
      min: 0,
      max: 10000,
      displayWith: (value: number): string | number => {
        if (value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
        return value;
      },
    };
  }

  filterItemsByUsersMapper(
    options: MatListOption[],
    products: Product[]
  ): Product[] {
    const userIds = options.map((option) => option.value);
    if (!userIds) {
      return [];
    }
    if (userIds.length === 0) {
      return [...products];
    }
    return [...products.filter((__) => userIds.includes(__.user.id))];
  }

  filterItemsByPriceMapper(
    price: number | null,
    products: Product[]
  ): Product[] {
    if (!price || price === 0) {
      return [...products];
    }
    return [...products.filter((__) => __.price <= price)];
  }
}
