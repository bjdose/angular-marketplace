import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductModule } from '../product';
import { CustomerRoutingModule } from './customer.routing.module';
import { ProductSearchPage } from './pages';

const modules = [CustomerRoutingModule, ProductModule, SharedModule];
const pages = [ProductSearchPage];

@NgModule({
  imports: [modules],
  declarations: [pages],
})
export class CustomerModule {}
