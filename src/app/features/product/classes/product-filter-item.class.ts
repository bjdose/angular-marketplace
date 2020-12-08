import { Type } from '@angular/core';
import { FilterHandlersProps, ProductFilterItemsDataType } from '../interfaces';

export class ProductFilterItem {
  constructor(
    public component: Type<any>,
    public data: ProductFilterItemsDataType,
    public handler: (data: FilterHandlersProps) => void
  ) {}
}
