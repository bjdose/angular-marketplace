import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '@app/core';
import { ProductsReportPage } from './pages';
import { ProductsReportResolver } from './resolvers';

const routes: Routes = [
  {
    path: appRoutes.products,
    component: ProductsReportPage,
    resolve: {
      products: ProductsReportResolver,
    },
  },
  {
    path: '**',
    redirectTo: `/${appRoutes.notFound}`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
