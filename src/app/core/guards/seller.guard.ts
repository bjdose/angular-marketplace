import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { UserService } from '../services';

@Injectable({ providedIn: 'root' })
export class SellerGuard implements CanActivate, CanLoad {
  constructor(private user: UserService, private router: Router) {}

  isSeller(): boolean {
    const isSeller = this.user.isSeller();
    if (!isSeller) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

  canActivate(): boolean {
    return this.isSeller();
  }

  canLoad(): boolean {
    return this.isSeller();
  }
}
