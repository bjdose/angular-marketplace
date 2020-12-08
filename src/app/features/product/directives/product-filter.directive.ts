import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appProductFilterHost]',
})
export class ProductFilterDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
