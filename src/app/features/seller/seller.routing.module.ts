import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '@app/core/config';
import { ProductListByUserResolver } from '../product';
import { CreateProductPage, ProductListPage } from './pages';

const routes: Routes = [
  {
    path: appRoutes.product,
    children: [
      {
        path: appRoutes.create,
        component: CreateProductPage,
      },
      {
        path: `${appRoutes.list}/:userId`,
        component: ProductListPage,
        resolve: {
          products: ProductListByUserResolver,
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
export class SellerRoutingModule {}
