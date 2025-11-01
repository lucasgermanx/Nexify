import { CouponContext } from "../providers/coupon.provider";
import { CouponContextType } from "@/core/server/@types/coupon.type";
import React from "react";

export default function useCoupon(){
    const context =  React.useContext(CouponContext) as CouponContextType
    return context
}