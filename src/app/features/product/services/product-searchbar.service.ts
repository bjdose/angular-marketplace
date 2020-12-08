import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { appConfig } from '@app/core/config';
import { ApiService } from '@app/core/http';
import { Product } from '@app/core/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap,
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductSearchbarService {
  private filteredProductsSubject$ = new BehaviorSubject<Product[]>([]);

  constructor(private api: ApiService) {}

  getSearchResults(): Observable<Product[]> {
    return this.filteredProductsSubject$.asObservable();
  }

  fetchProductsByQuery(
    query: string
  ): Observable<{
    noResults: boolean;
  } | null> {
    return this.api.get(`${appConfig.api.routes.product.search}/${query}`).pipe(
      map((products) => {
        this.filteredProductsSubject$.next(products);
        return null;
      }),
      catchError(() => {
        return of({ noResults: true });
      })
    );
  }

  searchbarAsyncValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      if (!control?.value) {
        this.filteredProductsSubject$.next([]);
        return of(null);
      }
      return control.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => this.fetchProductsByQuery(value)),
        map((invalid) => (invalid ? invalid : null)),
        catchError((error) => of(error)),
        first() // important to make observable finite
      );
    };
  }
}
