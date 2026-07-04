import { apiClient } from '@/api';
import { Endpoints } from '@/api/endpoints';
import { CustomerRelationships } from '../types';

export const customerRelationships = () =>
  apiClient.get<CustomerRelationships>(Endpoints.CUSTOMER_RELATIONSHIPS);
