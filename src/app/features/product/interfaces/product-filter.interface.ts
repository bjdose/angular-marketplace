import { MatListOption } from '@angular/material/list';
import { MatSliderChange } from '@angular/material/slider';
import { SelectionFilterComponent, SliderFilterComponent } from '../components';

export interface ProductFilter {
  data: ProductFilterItemsDataType;
  reset: () => void;
  handler: (props: FilterHandlersProps) => void;
}

export type ProductFilterItemsDataType = SelectionFilterData | SliderFilterData;

export type FilterComponents = SelectionFilterComponent | SliderFilterComponent;

export type FilterHandlersProps = MatListOption[] | MatSliderChange;

export interface FilterData {
  subheader: string;
}

export interface SelectionFilterData extends FilterData {
  options: SelectionFilterOption[];
}

export interface SelectionFilterOption {
  value: any;
  label: string;
}

export interface SliderFilterData extends FilterData {
  tickInterval: number;
  min: number;
  max: number;
  displayWith: (value: number) => string | number;
}
