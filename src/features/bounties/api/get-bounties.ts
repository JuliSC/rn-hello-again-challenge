import { apiClient } from '@/api';
import { Endpoints } from '@/api/endpoints';
import { Bounty } from '../types';

export const getBounties = () => apiClient.get<Bounty[]>(Endpoints.BOUNTIES);
