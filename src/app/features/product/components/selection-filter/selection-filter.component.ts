import { Component, Input, ViewChild } from '@angular/core';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { SelectionFilterData } from '../../interfaces';

@Component({
  selector: 'app-selection-filter',
  templateUrl: './selection-filter.component.html',
})
export class SelectionFilterComponent {
  @Input() data: SelectionFilterData = {} as SelectionFilterData;
  @Input() handler!: (options: MatListOption[]) => void;
  @ViewChild(MatSelectionList) private matSelectionList!: MatSelectionList;

  reset(): void {
    this.matSelectionList.deselectAll();
  }

  change(change: MatSelectionListChange): void {
    this.handler(change.source.selectedOptions.selected);
  }
}
