import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  AuthLayoutComponent,
  MainLayoutComponent,
  NavComponent,
  SpinnerComponent,
} from './components';
import {
  AppShellNoRenderDirective,
  AppShellRenderDirective,
} from './directives';
import { LayoutRoutingModule } from './layout.routing.module';

const directives = [AppShellNoRenderDirective, AppShellRenderDirective];
const components = [
  NavComponent,
  AuthLayoutComponent,
  MainLayoutComponent,
  SpinnerComponent,
];
const modules = [LayoutRoutingModule, SharedModule];

@NgModule({
  imports: [modules],
  declarations: [components, directives],
})
export class LayoutModule {}
