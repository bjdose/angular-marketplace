import { Component } from '@angular/core';
import { appRoutes } from '@app/core/config';
import { UserType } from '@app/core/enums';
import { AuthDialogService } from '@app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userType = UserType;
  appRoutes = appRoutes;
  constructor(private auth: AuthDialogService) {}

  login(): void {
    this.auth.openDialog();
  }
}
