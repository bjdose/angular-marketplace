import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h2 mat-dialog-title>¡Hubo un problema!</h2>
    <mat-dialog-content>
      <p *ngIf="data.status">
        <b>Código de error: {{ data.status }}</b>
      </p>
      <p class="error-message">
        {{ data?.message }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close color="primary">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .error-message {
        word-break: break-all;
      }
    `,
  ],
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; status?: number }
  ) {}
}
