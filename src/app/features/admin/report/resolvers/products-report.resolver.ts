import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Product } from '@app/core/models';
import { Observable } from 'rxjs';
import { ReportService } from '../services';

@Injectable({ providedIn: 'root' })
export class ProductsReportResolver implements Resolve<Product[]> {
  constructor(private report: ReportService) {}
  resolve(): Observable<Product[]> {
    return this.report.getProductsReport();
  }
}
