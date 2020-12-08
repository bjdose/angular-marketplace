import { Component, Input, ViewChild } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { SliderFilterData } from '../../interfaces';

@Component({
  selector: 'app-slider-filter',
  templateUrl: './slider-filter.component.html',
})
export class SliderFilterComponent {
  @Input() data: SliderFilterData = {} as SliderFilterData;
  @Input() handler!: (change: MatSliderChange) => void;
  @ViewChild(MatSlider) private matSlider!: MatSlider;

  reset(): void {
    this.matSlider.value = 0;
  }

  change(change: MatSliderChange): void {
    this.handler(change);
  }
}
