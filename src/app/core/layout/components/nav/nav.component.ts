import { Component } from '@angular/core';
import { SessionService } from '@app/core/authentication';
import { User } from '@app/core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  currentUser$: Observable<User | undefined> = this.session.currentUser();

  constructor(private session: SessionService) {}

  logout(): void {
    this.session.logout();
  }
}
