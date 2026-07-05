import { apiClient } from '@/api';
import { Endpoints } from '@/api/endpoints';
import { RedeemBountyRequest, RedeemBountyResponse } from '../types';

export const redeemBounty = (request: RedeemBountyRequest) =>
  apiClient.post<RedeemBountyResponse, RedeemBountyRequest>(
    Endpoints.REDEEM_BOUNTY,
    request,
  );
