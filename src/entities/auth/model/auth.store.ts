import { makeAutoObservable } from 'mobx';

import CookieHelper from '@shared/lib/Cookie';

class AuthStore {
  isAuthenticated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  async checkAuth() {
    this.isAuthenticated = !!CookieHelper.get('token');
  }

  clear() {
    this.isAuthenticated = false;
    CookieHelper.delete('token');
  }
}

export const authStore = new AuthStore();
