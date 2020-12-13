import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '@app/features/auth';
import { filter, first } from 'rxjs/operators';
import { SessionService } from '../authentication/session.service';

@Injectable({ providedIn: 'root' })
export class AuthDialogService {
  constructor(private dialog: MatDialog, private session: SessionService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '400px',
      maxWidth: '60vw',
      disableClose: false,
      hasBackdrop: true,
    });

    this.session
      .isAuthenticated()
      .pipe(
        filter((isAuth) => isAuth),
        first()
      )
      .subscribe(() => {
        dialogRef.close();
      });
  }
}
