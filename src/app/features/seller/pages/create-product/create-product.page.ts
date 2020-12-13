import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@app/core/authentication';
import { appRoutes } from '@app/core/config';
import { Product, User } from '@app/core/models';
import { ProductService } from '@app/features/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnDestroy {
  private suscriptions = new Subscription();
  private user: User | null = this.session.getCurrentUser();

  constructor(
    private product: ProductService,
    private session: SessionService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }

  submitForm(form: FormGroup): void {
    if (!this.user) {
      throw Error('Debes iniciar sesión para crear un producto');
    }
    const { sku, name, price, quantity } = form.value;
    this.suscriptions.add(
      this.product
        .create(new Product(sku, name, price, quantity, this.user))
        .subscribe(() => this.productCreated())
    );
  }

  productCreated(): void {
    this.router.navigateByUrl(appRoutes.productList);
  }
}
