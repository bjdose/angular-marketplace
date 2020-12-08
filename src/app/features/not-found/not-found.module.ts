import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { NotFoundRoutingModule } from './not-found.routing.module';
import { NotFoundPage } from './pages';

const modules = [NotFoundRoutingModule, SharedModule];
const pages = [NotFoundPage];

@NgModule({
  imports: [modules],
  declarations: [pages],
})
export class NotFoundModule {}
