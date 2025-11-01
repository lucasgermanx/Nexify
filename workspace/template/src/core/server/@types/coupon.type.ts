export interface ICoupon {
  id: number;
  user_reference: string;
  reference: string;
  coupon: string;
  coupon_discount: string;
  limited_used: string;
  used: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICouponResponse {
  failed: boolean;
  coupon: ICoupon;
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}


export type CouponContextType = {
  coupon: ICoupon | undefined;
  ProviderGetCoupon: (coupon: string) => void;
};
