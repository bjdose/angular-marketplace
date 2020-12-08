import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '@app/core/authentication';
import { Product, User } from '@app/core/models';
import {
  FilterHandlersProps,
  ProductFilterItem,
  ProductFilterMapperService,
  SelectionFilterComponent,
} from '@app/features/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-report',
  templateUrl: './products-report.page.html',
  styleUrls: ['./products-report.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsReportPage {
  currentUser$: Observable<User | undefined> = this.session.currentUser();
  products: Product[] = this.route.snapshot.data.products;
  filteredProducts: Product[] = this.products;
  productFilterItems: ProductFilterItem[] = [
    new ProductFilterItem(
      SelectionFilterComponent,
      this.productFilter.selectionFilterDataMapper(this.products),
      (props: FilterHandlersProps) => {
        this.selectionFilterHandler(props as MatListOption[]);
      }
    ),
  ];

  constructor(
    private route: ActivatedRoute,
    private productFilter: ProductFilterMapperService,
    private session: SessionService
  ) {}

  selectionFilterHandler(options: MatListOption[]): void {
    this.filteredProducts = this.productFilter.filterItemsByUsersMapper(
      options,
      this.products
    );
  }

  onResetFilters(): void {
    this.filteredProducts = [...this.products];
  }

  trackBySku(__: number, product: Product): string {
    return product.sku;
  }
}
