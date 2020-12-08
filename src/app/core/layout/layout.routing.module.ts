import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../config';
import { AdminGuard, AuthGuard, SellerGuard } from '../guards';
import { MainLayoutComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../features/home').then((m) => m.HomeModule),
      },
      {
        path: appRoutes.admin,
        canLoad: [AuthGuard, AdminGuard],
        loadChildren: () =>
          import('../../features/admin').then((m) => m.AdminModule),
      },
      {
        path: appRoutes.seller,
        canLoad: [AuthGuard, SellerGuard],
        loadChildren: () =>
          import('../../features/seller').then((m) => m.SellerModule),
      },
      {
        path: appRoutes.customer,
        loadChildren: () =>
          import('../../features/customer').then((m) => m.CustomerModule),
      },
    ],
  },
  {
    path: appRoutes.notFound,
    loadChildren: () =>
      import('../../features/not-found').then((m) => m.NotFoundModule),
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
export class LayoutRoutingModule {}
