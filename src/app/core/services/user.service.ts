import { Injectable } from '@angular/core';
import { SessionService } from '../authentication';
import { UserType } from '../enums';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUser: User | null = this.session.getCurrentUser();
  constructor(private session: SessionService) {}

  isAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.userType === UserType.Admin;
    }
    return false;
  }

  isCustomer(): boolean {
    if (this.currentUser) {
      return this.currentUser.userType === UserType.Customer;
    }
    return false;
  }

  isSeller(): boolean {
    if (this.currentUser) {
      return this.currentUser.userType === UserType.Seller;
    }
    return false;
  }
}
