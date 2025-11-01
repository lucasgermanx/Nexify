/* eslint-disable */

import { CouponContextType, ICoupon } from "@/core/server/@types/coupon.type";
import React, { useState } from "react";

import couponController from "@/core/server/controllers/coupon.controller";
import storeReference from "../utils/set-store-reference.utils";
import { toast } from "sonner";

export const CouponContext = React.createContext<CouponContextType | null>(null);

export const CouponProvider = (props: any) => {
    const [coupon, setCoupon] = useState<ICoupon | undefined>()
    const {store_reference} = storeReference()
    
    const ProviderGetCoupon = async (coupon: string) => {
        try {
            if(!store_reference)
                return

            const response = await couponController.getCouponByName(store_reference, coupon)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível realizar a procura do cupom! Tente novamente mais tarde.");
            }

            if(response.coupon == null){
                return toast.warning("O cupom informado não existe");
            }

            setCoupon(response.coupon)
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    
    return (
        <CouponContext.Provider value={{coupon, ProviderGetCoupon}}>
            {props.children}
        </CouponContext.Provider>
    );
};
