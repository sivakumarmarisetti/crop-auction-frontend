import { Injectable } from '@angular/core';

import { STORAGE } from '../constants/storage.constants';
import { CurrentUserModel } from '../../features/auth/models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveToken(token: string): void {
    localStorage.setItem(STORAGE.TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE.TOKEN);
  }

  removeToken(): void {
    localStorage.removeItem(STORAGE.TOKEN);
  }

  saveUser(user: CurrentUserModel): void {
    localStorage.setItem(
      STORAGE.USER,
      JSON.stringify(user)
    );
  }

  getUser(): CurrentUserModel | null {

    const user = localStorage.getItem(STORAGE.USER);

    return user
      ? JSON.parse(user) as CurrentUserModel
      : null;
  }

  clear(): void {
    localStorage.clear();
  }
}