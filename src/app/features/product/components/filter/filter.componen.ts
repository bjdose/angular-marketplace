import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductFilterItem } from '../../classes';
import { ProductFilterDirective } from '../../directives';
import { ProductFilter } from '../../interfaces';

@Component({
  selector: 'app-filter',
  template: ` <ng-template appProductFilterHost></ng-template>`,
})
export class FilterComponent implements OnInit {
  @Input() productFilterItem!: ProductFilterItem;
  @ViewChild(ProductFilterDirective, { static: true })
  productFilterHost!: ProductFilterDirective;
  private componentRef!: ComponentRef<ProductFilter>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.loadComponent();
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.productFilterItem.component
    );
    const viewContainerRef = this.productFilterHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent<ProductFilter>(
      componentFactory
    );

    this.componentRef.instance.handler = this.productFilterItem.handler;

    this.componentRef.instance.data = this.productFilterItem.data;
  }

  reset(): void {
    this.componentRef.instance.reset();
  }
}
