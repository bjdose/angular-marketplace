import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from '@app/core/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private router: Router) {}

  buyProducts(): void {
    this.router.navigateByUrl(appRoutes.productSearch);
  }

  createProduct(): void {
    // redirect to create product route and this route is protected
    // if user is not authenticated we must show AuthDialogComponent
    this.router.navigateByUrl(appRoutes.createProduct);
  }
}
