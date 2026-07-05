import { apiClient } from '@/api';
import { Endpoints } from '@/api/endpoints';
import { Profile } from '../types';

export const getProfile = () => apiClient.get<Profile>(Endpoints.PROFILE);
