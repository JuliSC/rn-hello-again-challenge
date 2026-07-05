import { useMutation } from '@tanstack/react-query';
import { redeemCoupon } from '../../api/redeem-coupon';
import { CouponRequest } from '../../types';

export const useRedeemCoupon = () =>
  useMutation({
    mutationFn: ({ code }: CouponRequest) => redeemCoupon({ code }),
  });
