import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export interface TokenStorage {
  getToken(): Promise<string | null>;
  setToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
}

export const tokenStorage: TokenStorage = {
  async getToken() {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  async setToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async clearToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
