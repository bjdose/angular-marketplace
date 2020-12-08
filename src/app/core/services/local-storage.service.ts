import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

class LocalStorage implements Storage {
  [name: string]: any;
  readonly length!: number;
  clear(): void {}
  getItem(_: string): string | null {
    return null;
  }
  key(_: number): string | null {
    return null;
  }
  removeItem(_: string): void {}
  setItem(_: string, __: string): void {}
}

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService implements Storage {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (this.isBrowser) {
      this.storage = localStorage;
    }
  }

  [name: string]: any;
  private storage: Storage = new LocalStorage();
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  length!: number;

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
