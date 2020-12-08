import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
  NavComponent,
} from './components';
import { LayoutRoutingModule } from './layout.routing.module';

const components = [NavComponent, AuthLayoutComponent, MainLayoutComponent];
const modules = [LayoutRoutingModule, SharedModule];

@NgModule({
  imports: [modules],
  declarations: [components],
})
export class LayoutModule {}
