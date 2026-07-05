export interface Bounty {
  id: string;
  name: string;
  description: string;
  is_redeemable: boolean;
  needed_points: number;
  cr_points: number;
}

export interface RedeemBountyRequest {
  bounty_id: string;
}
export interface RedeemBountyResponse {
  bounty_id: string;
}
