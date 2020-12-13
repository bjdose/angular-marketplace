import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../authentication';
import { appRoutes } from '../config';
import { MenuLink } from '../interfaces';
import { UserType } from './../enums/user-type.enum';
import { AuthDialogService } from './auth-dialog.service';

@Injectable({ providedIn: 'root' })
export class NavService {
  private menuLinks: MenuLink[] = [
    {
      label: 'Inicia sesion',
      visible: () => !this.session.getCurrentSession(),
      action: (): void => {
        this.auth.openDialog();
      },
    },
    {
      label: 'Inicio',
      visible: (): boolean => {
        const userTypes: UserType[] = [
          UserType.Admin,
          UserType.Customer,
          UserType.Seller,
        ];
        return this.session.checkUserTypes(userTypes);
      },
      action: (): void => {
        this.router.navigateByUrl(appRoutes.home);
      },
    },
    {
      label: 'Crear producto',
      visible: (): boolean => {
        if (!this.session.getCurrentSession()) {
          return true;
        }
        return this.checkUserTypes([UserType.Seller]);
      },
      action: (): void => {
        this.router.navigateByUrl(appRoutes.createProduct);
      },
    },
    {
      label: 'Inventario',
      visible: (): boolean => {
        const userTypes: UserType[] = [UserType.Seller];
        return this.session.checkUserTypes(userTypes);
      },
      action: (): void => {
        this.router.navigateByUrl(appRoutes.productList);
      },
    },
    {
      label: 'Productos',
      visible: (): boolean => {
        const userTypes: UserType[] = [UserType.Admin];
        return this.session.checkUserTypes(userTypes);
      },
      action: (): void => {
        this.router.navigateByUrl(appRoutes.productsReport);
      },
    },
    {
      label: 'Comprar producto',
      visible: (): boolean => {
        if (!this.session.getCurrentSession()) {
          return true;
        }
        return this.checkUserTypes([UserType.Customer]);
      },
      action: (): void => {
        this.router.navigateByUrl(appRoutes.productSearch);
      },
    },
    {
      label: 'Cerrar sesión',
      visible: () => !!this.session.getCurrentSession(),
      action: (): void => {
        this.logout();
      },
    },
  ];

  constructor(
    private session: SessionService,
    private router: Router,
    private auth: AuthDialogService
  ) {}

  checkUserTypes(userTypes: UserType[]): boolean {
    return this.session.checkUserTypes(userTypes);
  }

  getMenuLinks(): MenuLink[] {
    return this.menuLinks;
  }

  logout(): void {
    this.session.logout();
  }
}
