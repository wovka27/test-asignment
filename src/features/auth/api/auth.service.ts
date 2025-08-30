import { fetchGetAuth } from '@entities/auth/api';
import { authStore } from '@entities/auth/model/auth.store.ts';

export default class AuthService {
  static async loginAction(_: { success: boolean }, formData: FormData) {
    const response = await fetchGetAuth(formData);

    const success = response.status === 200;

    authStore.setIsAuthenticated(success);

    return { success };
  }
}
