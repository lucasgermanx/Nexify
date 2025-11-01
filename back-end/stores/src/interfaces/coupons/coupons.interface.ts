export interface ICouponCreatePayload {
    store_reference: string;
    coupon: string;
    coupon_discount: number;
    limited_used: number;
    type: 'direct' | 'percentage';
}


export interface ICouponUpdatePayload {
    store_reference: string;
    coupon: string;
    coupon_discount: number;
    limited_used: number;
    type: 'direct' | 'percentage';
}
