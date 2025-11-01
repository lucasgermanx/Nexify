import { ICouponResponse } from "../@types/coupon.type";
import couponService from "../services/coupon.service";

class CouponsController {
  public async getCouponByName(store_reference:string, coupon:string): Promise<ICouponResponse | undefined> { 
      return await couponService.getCouponsData(store_reference, coupon);
  }
}

export default new CouponsController();
