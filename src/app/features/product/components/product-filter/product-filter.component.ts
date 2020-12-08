import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ProductFilterItem } from '../../classes';
import { FilterComponent } from './../filter/filter.componen';

@Component({
  selector: 'app-product-filter',
  template: `
    <div class="flex padding">
      <span class="flex-full">Filtros</span>
      <span class="spacer"></span>
      <button mat-button color="warn" class="underline" (click)="reset()">
        Borrar
      </button>
    </div>
    <app-filter
      *ngFor="let productFilterItem of productFilterItems"
      [productFilterItem]="productFilterItem"
    ></app-filter>
  `,
})
export class ProductFilterComponent {
  @Input() productFilterItems: ProductFilterItem[] = [];
  @Output() resetAll = new EventEmitter();

  @ViewChildren(FilterComponent) filterComponents!: QueryList<FilterComponent>;

  reset(): void {
    this.filterComponents.forEach((filterComponent) => {
      filterComponent.reset();
    });
    this.resetAll.emit();
  }
}
