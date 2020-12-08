import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  CreateProductForm,
  FilterComponent,
  ProductCardComponent,
  ProductFilterComponent,
  ProductSearchbarComponent,
  SelectionFilterComponent,
  SliderFilterComponent,
} from './components';
import { ProductFilterDirective } from './directives';

const modules = [SharedModule];
const components = [
  CreateProductForm,
  ProductCardComponent,
  ProductFilterComponent,
  SelectionFilterComponent,
  SliderFilterComponent,
  FilterComponent,
  ProductSearchbarComponent,
];
const directives = [ProductFilterDirective];

@NgModule({
  imports: [modules],
  exports: [components],
  declarations: [components, directives],
})
export class ProductModule {}
