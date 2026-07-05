import { apiClient } from '@/api';
import { Endpoints } from '@/api/endpoints';
import { CouponRequest, CouponResponse } from '../types';

export const redeemCoupon = (request: CouponRequest) =>
  apiClient.post<CouponResponse, CouponRequest>(
    Endpoints.REDEEM_COUPON,
    request,
  );
