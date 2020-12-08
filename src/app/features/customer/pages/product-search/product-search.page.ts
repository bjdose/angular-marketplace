import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute } from '@angular/router';
import { UserType } from '@app/core/enums';
import { Product } from '@app/core/models';
import { intersect } from '@app/core/utils';
import {
  FilterHandlersProps,
  ProductFilterItem,
  ProductFilterMapperService,
  SliderFilterComponent,
} from '@app/features/product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchPage implements OnInit {
  userType = UserType;
  products: Product[] = this.route.snapshot.data.products;
  filteredProducts: Product[] = [];
  searchedProducts: Product[] = [];
  visibleProducts: Product[] = [];
  productFilterItems: ProductFilterItem[] = [
    new ProductFilterItem(
      SliderFilterComponent,
      this.productFilter.sliderFilterDataMapper(),
      (options: FilterHandlersProps) => {
        this.sliderFilterHandler(options as MatSliderChange);
      }
    ),
  ];
  constructor(
    private route: ActivatedRoute,
    private productFilter: ProductFilterMapperService
  ) {}

  ngOnInit(): void {
    this.updateVisibleProducts();
  }

  onResetFilters(): void {
    this.filteredProducts = [];
    this.updateVisibleProducts();
  }

  onQueryChange(query: string): void {
    this.searchedProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
    );
    this.updateVisibleProducts();
  }

  sliderFilterHandler(change: MatSliderChange): void {
    this.filteredProducts = this.productFilter.filterItemsByPriceMapper(
      change.value,
      this.products
    );
    this.updateVisibleProducts();
  }

  trackBySku(__: number, product: Product): string {
    return product.sku;
  }

  updateVisibleProducts(): void {
    // REFACTOR: use a better approach..

    if (
      this.filteredProducts.length === 0 &&
      this.searchedProducts.length === 0
    ) {
      this.visibleProducts = this.products;
      return;
    }

    if (this.filteredProducts.length > 0 && this.searchedProducts.length > 0) {
      this.visibleProducts = intersect(
        this.filteredProducts,
        this.searchedProducts
      );
      return;
    }

    if (
      this.filteredProducts.length > 0 &&
      this.searchedProducts.length === 0
    ) {
      this.visibleProducts = this.filteredProducts;
      return;
    }

    if (
      this.filteredProducts.length === 0 &&
      this.searchedProducts.length > 0
    ) {
      this.visibleProducts = this.searchedProducts;
      return;
    }
  }
}
