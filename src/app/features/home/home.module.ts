import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home.routing.module';
import { HomePage } from './pages';

const modules = [HomeRoutingModule, SharedModule];
const pages = [HomePage];

@NgModule({
  imports: [modules],
  declarations: [pages],
})
export class HomeModule {}
