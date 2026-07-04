export interface TokenStorage {
  getToken(): Promise<string | null>;
  setToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
}

let token: string | null = null;

export const tokenStorage: TokenStorage = {
  async getToken() {
    return token;
  },

  async setToken(newToken: string) {
    token = newToken;
  },

  async clearToken() {
    token = null;
  },
};
