export interface CouponRequest {
  code: string;
}

export interface CouponResponse {
  success: boolean;
  coupon: string;
  points: number;
  cr_points: number;
}
