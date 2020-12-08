import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  ErrorHandler,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { AuthInterceptor, HttpErrorInterceptor } from './interceptors';
import { LayoutModule } from './layout';
import { FakeBackendInterceptor } from './mocks';
import { GlobalErrorHandler } from './services';
import { throwIfAlreadyLoaded } from './utils';

const modules = [LayoutModule, HttpClientModule];
const providers = [
  { provide: ErrorHandler, useClass: GlobalErrorHandler },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
  },
];

@NgModule({
  imports: [modules],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [providers],
    };
  }
}
