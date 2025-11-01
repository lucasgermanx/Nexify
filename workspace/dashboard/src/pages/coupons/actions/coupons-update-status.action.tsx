import { ICoupon } from "@/core/client/providers/coupons/coupons-provider.type";
import { useCoupon } from "@/core/client/providers/coupons/coupons.provider";
import { toast } from "sonner"

export const CouponsUpdateStatus = () => {
    const {ProviderUpdateStatusCoupon} = useCoupon()
    
    const updateStatusCoupon = (status:boolean, coupon:ICoupon) => {
        if(coupon.limited_used == coupon.used && status == true){
            return toast.warning("O cupom não pode ser ativado pois atingiu a sua quantidade máxima de uso. Atualize-o!");
        }
        ProviderUpdateStatusCoupon(status, coupon.reference)
    }

    return {updateStatusCoupon}
}