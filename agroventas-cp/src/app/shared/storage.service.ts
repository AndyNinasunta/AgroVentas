import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserI } from './interfaces/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  $user: BehaviorSubject<UserI> = new BehaviorSubject<UserI>(null);
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  get user(): UserI {
    let user: UserI;
    // let userStr = '';
    // this.get('user').then((res) => {
    //   userStr = res;
    // });
    // this.setUser(userStr);
    this.$user.subscribe((res) => {
      user = res;
    });
    return user;
  }

  set user(value: any) {
    this.setUser(value);
  }

  setUser(value: any) {
    this.set('user', value);
    this.$user.next(JSON.parse(value) as UserI);
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
}
