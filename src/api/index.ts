import { tokenStorage } from '@/features/auth/storage/token-storage';
import { createApiClient } from './client';

export const apiClient = createApiClient({
  getToken: tokenStorage.getToken,
});
