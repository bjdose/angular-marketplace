import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Product } from '@app/core/models';
import { Observable } from 'rxjs';
import { ProductService } from '../services';

@Injectable({ providedIn: 'root' })
export class ProductListResolver implements Resolve<Product[]> {
  constructor(private product: ProductService) {}

  resolve(): Observable<Product[]> {
    return this.product.getProducts();
  }
}
