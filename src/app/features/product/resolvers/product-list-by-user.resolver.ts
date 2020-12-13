import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SessionService } from '@app/core/authentication';
import { Product } from '@app/core/models';
import { Observable } from 'rxjs';
import { ProductService } from '../services';

@Injectable({ providedIn: 'root' })
export class ProductListByUserResolver implements Resolve<Product[]> {
  constructor(
    private product: ProductService,
    private session: SessionService
  ) {}

  resolve(): Observable<Product[]> {
    const userId = this.session.getCurrentUser()?.id;
    if (!userId) {
      throw Error('Usuario ID es requerido');
    }
    return this.product.getProductsByUserId(userId);
  }
}
