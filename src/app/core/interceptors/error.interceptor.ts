import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ErrorDialogService, LoadingDialogService } from '../services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private error: ErrorDialogService,
    private loading: LoadingDialogService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loading.openDialog();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // TODO: handle backend errors..
        this.error.openDialog(
          error.message ?? JSON.stringify(error),
          error.status
        );
        return throwError(error);
      }),
      finalize(() => {
        this.loading.hideDialog();
      })
    ) as Observable<HttpEvent<any>>;
  }
}
