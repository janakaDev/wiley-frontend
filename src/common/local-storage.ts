import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import {Inject, Injectable} from '@angular/core';

export class LocalStorage {
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  storeData(key: any, value: any) {
    this.storage.set(key, value);
  }

  getStorageData(key: any) {
    return this.storage.get(key);
  }

  clearData(key: any) {
    this.storage.remove(key);
  }

  clearStorageData(): void {
    localStorage.clear();
  }
}
