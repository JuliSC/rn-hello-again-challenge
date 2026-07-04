import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/login';
import { LoginRequest } from '../../types';

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      login({ email, password }),
  });
