import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfig } from '../config';
import { ApiService } from '../http';
import { LoginUser, RegisterUser, Session } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private api: ApiService) {}

  login(loginUser: LoginUser): Observable<Session> {
    return this.api.post(appConfig.api.routes.auth.login, loginUser);
  }

  register(registerUser: RegisterUser): Observable<Session> {
    return this.api.post(appConfig.api.routes.auth.register, registerUser);
  }
}
