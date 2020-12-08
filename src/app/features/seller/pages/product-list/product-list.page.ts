import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/core/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage {
  products$: Observable<Product[]> = this.route.data.pipe(
    map((data) => data.products)
  );
  tableCols = ['name', 'sku', 'quantity', 'price'];
  constructor(private route: ActivatedRoute) {}
}
