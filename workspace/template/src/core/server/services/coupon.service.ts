import axiosConfig from "@/global/axios/axios.config";
import { ICouponResponse } from "../@types/coupon.type";

class CouponService {
  public async getCouponsData(store_reference: string, coupon:string): Promise<ICouponResponse> {
    const response = await axiosConfig.get(`/store/coupon/${store_reference}/${coupon}`);

    return response.data;
  }
}

export default new CouponService()