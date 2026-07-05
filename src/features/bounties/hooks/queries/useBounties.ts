import { useQuery } from '@tanstack/react-query';
import { getBounties } from '../../api/get-bounties';

export const useBounties = () =>
  useQuery({
    queryKey: ['bounties'],
    queryFn: getBounties,
  });
