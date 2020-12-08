import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-dialog',
  template: `
    <h1 mat-dialog-title>Loading data</h1>
    <div mat-dialog-content>Please have a moment of patience</div>
    <div mat-dialog-actions>
      <div class="loading-spinner">
        <mat-spinner diameter="40" strokeWidth="2"></mat-spinner>
      </div>
    </div>
  `,
  styles: [
    `
      .mat-dialog-actions {
        margin-top: -2rem !important;
        padding-top: 2rem !important;
      }

      .loading-spinner {
        text-align: center;
        margin: 3rem auto;
      }
    `,
  ],
})
export class LoadingDialogComponent {}
