import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  get(path?: string, headers: HttpHeaders = this.headers): Observable<any> {
    return this.http.get(`${appConfig.api.prefix}${path}`, { headers });
  }

  post(
    path: string,
    body: object = {},
    headers: HttpHeaders = this.headers
  ): Observable<any> {
    return this.http.post(
      `${appConfig.api.prefix}${path}`,
      JSON.stringify(body),
      {
        headers,
      }
    );
  }
}
