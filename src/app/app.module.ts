import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'angular-marketplace' }),
    CoreModule.forRoot(),
    RouterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
