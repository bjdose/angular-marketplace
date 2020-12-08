import { Injectable } from '@angular/core';
import { appRoutes } from '@app/core/config';
import { ApiService } from '@app/core/http';
import { Product } from '@app/core/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private api: ApiService) {}

  getProductsReport(): Observable<Product[]> {
    return this.api.get(
      `${appRoutes.admin}/${appRoutes.report}/${appRoutes.products}`
    );
  }
}
