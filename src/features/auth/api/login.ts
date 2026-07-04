import { apiClient } from '@/api';
import { Endpoints } from '@/api/endpoints';
import { LoginRequest, LoginResponse } from '../types';

export const login = (request: LoginRequest) =>
  apiClient.post<LoginResponse, LoginRequest>(Endpoints.LOGIN, request);
