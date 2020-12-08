import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '@app/core/config';

const routes: Routes = [
  {
    path: appRoutes.report,
    loadChildren: () => import('./report').then((m) => m.ReportModule),
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
export class AdminRoutingModule {}
