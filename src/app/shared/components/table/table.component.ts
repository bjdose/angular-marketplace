import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  template: `
    <table mat-table [dataSource]="tableDataSrc">
      <ng-container *ngFor="let col of tableCols">
        <ng-container matColumnDef="{{ col }}">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            {{ col | titlecase }}
          </th>
          <td mat-cell *matCellDef="let profile">{{ profile[col] }}</td>
        </ng-container>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="tableCols"></tr>
      <tr mat-row *matRowDef="let row; columns: tableCols"></tr>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class TableComponent implements OnInit {
  tableDataSrc: any;
  @Input() tableCols: string[] = [];
  @Input() tableData: any[] | null = [];

  constructor() {}

  ngOnInit(): void {
    if (!this.tableData) {
      throw Error('El contenido de la table no es válido');
    }
    this.tableDataSrc = new MatTableDataSource(this.tableData);
  }
}
