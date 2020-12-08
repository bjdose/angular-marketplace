import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ProductModule } from '../product';
import { CreateProductPage, ProductListPage } from './pages';
import { SellerRoutingModule } from './seller.routing.module';

const modules = [SellerRoutingModule, ProductModule, SharedModule];
const pages = [CreateProductPage, ProductListPage];

@NgModule({
  imports: [modules],
  declarations: [pages],
})
export class SellerModule {}
