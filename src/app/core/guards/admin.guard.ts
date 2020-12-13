import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { appRoutes } from '../config';
import { UserService } from '../services';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private user: UserService, private router: Router) {}

  isAdmin(): boolean {
    const isAdmin = this.user.isAdmin();
    if (!isAdmin) {
      this.router.navigateByUrl(appRoutes.home);
      return false;
    }
    return true;
  }

  canActivate(): boolean {
    return this.isAdmin();
  }

  canLoad(): boolean {
    return this.isAdmin();
  }
}
