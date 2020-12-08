import { NgModule } from '@angular/core';
import { ProductModule } from '@app/features/product';
import { SharedModule } from '@app/shared';
import { ProductsReportPage } from './pages';
import { ReportRoutingModule } from './report.routing.module';

const modules = [ReportRoutingModule, ProductModule, SharedModule];
const pages = [ProductsReportPage];

@NgModule({
  imports: [modules],
  declarations: [pages],
})
export class ReportModule {}
