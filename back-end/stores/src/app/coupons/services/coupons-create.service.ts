import { ICouponCreatePayload } from "@/interfaces/coupons/coupons.interface";
import couponsRepository from "../repositories/coupons.repository";

class CouponsCreateService {
    public async Create(createPayload: ICouponCreatePayload) {
        const findCoupons = await couponsRepository.findCouponByStoreReference(
            createPayload.store_reference,
            createPayload.coupon
        );

        if (findCoupons.length != 0) {
            return {
                failed: true,
                message: "Esse cupom já existe na sua loja. Tente outro cupom.",
                status: 200,
            };
        }

        const createdCoupon = await couponsRepository.couponCreate(createPayload);

        if (!createdCoupon) {
            return {
                failed: true,
                message: "Não foi possivel criar o seu cupom no momento. Tente novamente mais tarde!",
                status: 500,
            };
        }

        return { failed: false, message: "Cupom criado com sucesso", status: 200 };
    }
}

export default new CouponsCreateService()