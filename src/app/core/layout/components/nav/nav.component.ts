import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SessionService } from '@app/core/authentication';
import { appRoutes } from '@app/core/config';
import { MenuLink } from '@app/core/interfaces';
import { User } from '@app/core/models';
import { NavService } from '@app/core/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  appRoutes = appRoutes;
  menuLinks: MenuLink[] = [];
  currentUser$: Observable<User | undefined> = this.session.currentUser().pipe(
    tap(() => {
      this.menuLinks = this.nav.getMenuLinks();
    })
  );

  constructor(private session: SessionService, private nav: NavService) {}

  trackByMenuLabel(__: number, menu: MenuLink): string {
    return menu.label;
  }
}
