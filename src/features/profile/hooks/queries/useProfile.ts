import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../api/get-profile';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });
