import couponsRepository from "../repositories/coupons.repository";

class CouponsDeleteService {
    public async Delete(deletePayload: any) {
        const findCoupons = await couponsRepository.findCouponByReference(deletePayload.coupon_reference);

        if (!findCoupons) {
            return {
                failed: true,
                message: "Esse cupom não existe na sua loja. Tente outro cupom!",
                status: 200,
            };
        }


        const deletedCoupon = await couponsRepository.deleteCoupon(
            findCoupons.id
        );

        if (!deletedCoupon) {
            return {
                failed: true,
                message: "Esse cupom não foi deletado. Tente novamente mais tarde!",
                status: 200,
            };
        }

        return {
            failed: false,
            message: "Cupom deletado com sucesso!",
            status: 200,
        };
    }
}

export default new CouponsDeleteService()