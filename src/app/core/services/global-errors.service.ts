import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorDialogService: ErrorDialogService) {}

  handleError(error: Error): void {
    this.errorDialogService.openDialog(
      error.message || 'Undefined client error'
    );
    // TODO: use logger here (slack, email...)
  }
}
