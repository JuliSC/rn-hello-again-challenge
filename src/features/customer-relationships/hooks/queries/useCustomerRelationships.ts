import { useQuery } from '@tanstack/react-query';
import { customerRelationships } from '../../api/customer-relationship';

export const useCustomerRelationships = () =>
  useQuery({
    queryKey: ['customer-relationships'],
    queryFn: () => customerRelationships(),
  });
