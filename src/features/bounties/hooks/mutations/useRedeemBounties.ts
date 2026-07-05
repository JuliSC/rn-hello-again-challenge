import { useMutation } from '@tanstack/react-query';
import { redeemBounty } from '../../api/redeem-bounty';
import { RedeemBountyRequest } from '../../types';

export const useRedeemBounty = ({ onSuccess }: { onSuccess: () => void }) =>
  useMutation({
    mutationFn: ({ bounty_id }: RedeemBountyRequest) =>
      redeemBounty({ bounty_id }),
    onSuccess,
  });
