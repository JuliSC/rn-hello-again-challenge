import { useMutation } from '@tanstack/react-query';
import { tokenStorage } from '../../../../storage/token-storage';
import { login } from '../../api/login';
import { LoginRequest } from '../../types';

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      login({ email, password }),
    onSuccess: async (response) => {
      await tokenStorage.setToken(response.token);
    },
  });
