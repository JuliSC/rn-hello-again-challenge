import { API_CONFIG } from '@/constants/api';

interface CreateApiClientOptions {
  getToken?: () => Promise<string | null>;
}

export const createApiClient = ({ getToken }: CreateApiClientOptions = {}) => {
  const request = async <T>(path: string, init: RequestInit): Promise<T> => {
    const token = await getToken?.();

    const response = await fetch(`${API_CONFIG.BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init.method === 'POST'
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(token
          ? {
              Authorization: `Token ${token}`,
            }
          : {}),
      },
    });

    return response.json() as Promise<T>;
  };

  return {
    get<T>(path: string): Promise<T> {
      return request<T>(path, {
        method: 'GET',
      });
    },

    post<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
      return request<TResponse>(path, {
        method: 'POST',
        body: JSON.stringify(body),
      });
    },
  };
};
