import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';
import { SessionService } from '@app/core/authentication';
import { AuthDialogService } from '@app/core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { appRoutes } from '../config';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private session: SessionService,
    private auth: AuthDialogService,
    private router: Router
  ) {}

  isAuth(): Observable<boolean> {
    return this.session.isAuthenticated().pipe(
      map((isAuth) => {
        if (!isAuth) {
          this.noAuthHandler();
        }
        return isAuth;
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.isAuth();
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }

  canLoad(): Observable<boolean> {
    return this.isAuth();
  }

  private noAuthHandler(): void {
    this.router.navigateByUrl(appRoutes.home);
    this.auth.openDialog();
  }
}
