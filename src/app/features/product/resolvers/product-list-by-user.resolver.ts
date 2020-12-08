import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Product } from '@app/core/models';
import { Observable } from 'rxjs';
import { ProductService } from '../services';

@Injectable({ providedIn: 'root' })
export class ProductListByUserResolver implements Resolve<Product[]> {
  constructor(private product: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    const userId = Number(route.params.userId);
    if (!userId) {
      throw Error('Usuario ID es requerido');
    }
    return this.product.getProductsByUserId(userId);
  }
}
