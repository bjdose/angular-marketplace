import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  template: `
    <h2 mat-dialog-title>Mensaje informativo</h2>
    <mat-dialog-content>
      <p class="message">
        {{ data.message }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close color="primary">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .message {
        word-break: break-all;
      }
    `,
  ],
})
export class MessageDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string }
  ) {}
}
