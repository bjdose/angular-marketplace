import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';
import { LocalstorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private localStorageService: Storage = this.storage;
  private currentSession: Session | null = this.loadSessionData();
  private currentSessionSubject = new BehaviorSubject<Session | null>(
    this.getCurrentSession()
  );

  constructor(private router: Router, private storage: LocalstorageService) {}

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.currentSessionSubject.next(this.currentSession);
    this.localStorageService.setItem(
      StorageKeys.CurrentUser,
      JSON.stringify(session)
    );
  }

  loadSessionData(): Session | null {
    const sessionStr = this.localStorageService.getItem(
      StorageKeys.CurrentUser
    );
    return sessionStr ? (JSON.parse(sessionStr) as Session) : null;
  }

  getCurrentSession(): Session | null {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.currentSession = null;
    this.currentSessionSubject.next(this.currentSession);
    this.localStorageService.removeItem(StorageKeys.CurrentUser);
  }

  getCurrentUser(): User | null {
    const session: Session | null = this.getCurrentSession();
    return session && session.user ? session.user : null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentSessionSubject.asObservable().pipe(
      map((session) => !!session),
      share()
    );
  }

  currentUser(): Observable<User | undefined> {
    return this.currentSessionSubject
      .asObservable()
      .pipe(map((session) => session?.user));
  }

  getCurrentToken(): string | null {
    const session = this.getCurrentSession();
    return session?.token ? session.token : null;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/']);
  }
}
