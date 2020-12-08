import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@app/core/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: [
    `
      img {
        margin: 16px auto;
      }
    `,
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {} as Product;
  constructor() {}

  ngOnInit(): void {}
}
