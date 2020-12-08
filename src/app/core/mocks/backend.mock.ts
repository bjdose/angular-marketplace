import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { appConfig } from '../config';
import { StorageKeys } from '../enums';
import { Product, Session, User } from '../models';
import { LocalstorageService } from '../services/local-storage.service';
import { products as mockedProducts } from './products';
import { users as mockedUsers } from './users';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  users: any[] = JSON.parse(
    this.storage.getItem(StorageKeys.Users) || JSON.stringify(mockedUsers)
  );
  products: Product[] = JSON.parse(
    this.storage.getItem(StorageKeys.Products) || JSON.stringify(mockedProducts)
  );
  constructor(private storage: LocalstorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(() => this.handleRoute(request, next)))
      .pipe(delay(1000));
  }

  handleRoute(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    switch (true) {
      case url.endsWith(
        `${appConfig.api.prefix}${appConfig.api.routes.auth.login}`
      ) && method === 'POST':
        return this.authenticate(body);
      case url.endsWith(
        `${appConfig.api.prefix}${appConfig.api.routes.auth.register}`
      ) && method === 'POST':
        return this.register(body);
      case url.endsWith('admin/report/products') && method === 'GET':
        return this.getReportProducts(headers);
      case url.endsWith('product/all') && method === 'GET':
        return this.getProducts();
      case url.match(/\/product\/all\/\d+$/) && method === 'GET':
        return this.getProductByUserId(headers, url);
      case url.match(/\/product\/search\/\w+$/) && method === 'GET':
        return this.getProductsByQuery(url);
      case url.endsWith(
        `${appConfig.api.prefix}${appConfig.api.routes.product.create}`
      ) && method === 'POST':
        return this.createProduct(body);
      default:
        // pass through any requests not handled above
        return next.handle(request);
    }
  }

  // route functions

  register(body: string): Observable<HttpEvent<Session>> {
    const user: User = JSON.parse(body);

    if (this.users.find((x) => x.email === user.email)) {
      return this.error(`El correo ${user.email} ya esta registrado.`);
    }

    user.id = this.users.length
      ? Math.max(...this.users.map((x) => x.id)) + 1
      : 1;
    this.users.push(user);
    this.storage.setItem(StorageKeys.Users, JSON.stringify(this.users));

    const session: Session = {
      token: 'fake-jwt-token',
      user: new User(user.id, user.email, user.userType),
    };

    return this.ok(session);
  }

  getReportProducts(headers: HttpHeaders): Observable<HttpEvent<any>> {
    if (!this.isLoggedIn(headers)) {
      return this.unauthorized();
    }
    return this.ok(this.products);
  }

  getProducts(): Observable<HttpEvent<any>> {
    return this.ok(this.products);
  }

  getProductsByQuery(url: string): Observable<HttpEvent<Product[]>> {
    const query = this.queryFromUrl(url).toLocaleLowerCase();
    const productsByQuery: Product[] = this.products.filter(
      (x) =>
        x.name.toLocaleLowerCase().includes(query) ||
        x.sku.toLocaleLowerCase().includes(query)
    );
    return this.ok(productsByQuery);
  }

  getProductByUserId(
    headers: HttpHeaders,
    url: string
  ): Observable<HttpEvent<Product[]>> {
    if (!this.isLoggedIn(headers)) {
      return this.unauthorized();
    }

    const productsByUserId: Product[] = this.products.filter(
      (x) => x.user.id === this.idFromUrl(url)
    );
    return this.ok(productsByUserId);
  }

  createProduct(body: string): Observable<HttpEvent<Product>> {
    const product: Product = JSON.parse(body);
    this.products.push(product);
    this.storage.setItem(StorageKeys.Products, JSON.stringify(this.products));
    return this.ok(product);
  }

  unauthorized(): Observable<HttpEvent<any>> {
    return throwError({ status: 401, error: { message: 'Unauthorised' } });
  }

  // helper functions

  ok(payload?: any): Observable<HttpEvent<any>> {
    return of(new HttpResponse({ status: 200, body: payload }));
  }

  error(message: string): Observable<never> {
    return throwError({ message });
  }

  authenticate(body: string): Observable<HttpEvent<Session>> {
    const { email, password } = JSON.parse(body);
    const user = this.users.find(
      (x) => x.email === email && x.password === password
    );
    if (!user) {
      return this.error('El correo o la contraseña es incorrecta.');
    }

    const session: Session = {
      token: 'fake-jwt-token',
      user: new User(user.id, user.email, user.userType),
    };
    return this.ok(session);
  }

  isLoggedIn(headers: HttpHeaders): boolean {
    return headers.get('Authorization') === 'Bearer fake-jwt-token';
  }

  idFromUrl(url: string): number {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1], 10);
  }

  queryFromUrl(url: string): string {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
  }
}
