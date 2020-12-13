import { isPlatformBrowser } from '@angular/common';
import {
  ErrorHandler,
  Inject,
  Injectable,
  Injector,
  PLATFORM_ID,
} from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  constructor(
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  handleError(error: Error): void {
    if (this.isBrowser) {
      const errorDialogService: ErrorDialogService = this.injector.get(
        ErrorDialogService
      );

      errorDialogService.openDialog(error.message || 'Undefined client error');
    }

    // TODO: use logger here (slack, email...)

    throw error; // for default behaviour rather than silentely dying
  }
}
