import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private $user: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }

  public set(key: string, value: any) {
    // eslint-disable-next-line no-underscore-dangle
    this._storage?.set(key, value);
  }

  public async get(key: string) {
    // eslint-disable-next-line no-underscore-dangle
    return await this._storage?.get(key);
  }

  public async remove(key: string) {
    // eslint-disable-next-line no-underscore-dangle
    return await this._storage?.remove(key);
  }

  public setUser(value: any) {
    this.set('user', value);
    this.$user.next(value);
  }

  getUser(): Observable<string> {
    return this.$user.asObservable();
  }
}
