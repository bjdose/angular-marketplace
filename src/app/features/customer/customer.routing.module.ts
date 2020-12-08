import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '@app/core/config';
import { ProductListResolver } from '../product';
import { ProductSearchPage } from './pages';

const routes: Routes = [
  {
    path: appRoutes.product,
    children: [
      {
        path: appRoutes.search,
        component: ProductSearchPage,
        resolve: {
          products: ProductListResolver,
        },
      },
    ],
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
export class CustomerRoutingModule {}
