import { Injectable } from '@angular/core';
import { appConfig } from '@app/core/config';
import { ApiService } from '@app/core/http';
import { Product } from '@app/core/models';
import { MessageDialogService } from '@app/core/services';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private api: ApiService, private message: MessageDialogService) {}

  create(product: Product): Observable<Product> {
    return this.api.post(appConfig.api.routes.product.create, product).pipe(
      finalize(() => {
        this.message.openDialog('Producto creado con éxito');
      })
    );
  }

  getProductsByUserId(userId: number): Observable<Product[]> {
    return this.api.get(`${appConfig.api.routes.product.all}/${userId}`);
  }

  getProducts(): Observable<Product[]> {
    return this.api.get(appConfig.api.routes.product.all);
  }
}
