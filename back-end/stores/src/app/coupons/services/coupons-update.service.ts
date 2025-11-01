import couponsRepository from "../repositories/coupons.repository";

class CouponsUpdateService {
    public async Update(updatePayload: any) {
        const findCouponByID = await couponsRepository.findCouponByReference(updatePayload.coupon_reference);

        if (!findCouponByID) {
            return {
                failed: true,
                message: "Este cupom não existe. Tente novamente mais tarde!",
                status: 200,
            };
        }

        delete updatePayload.coupon_reference;
        delete updatePayload.store_reference;

        const updatedCoupon = await couponsRepository.updateCoupon(updatePayload, findCouponByID.reference);

        if (!updatedCoupon) {
            return {
                failed: true,
                message: "Seu cupom não foi atualizado. Tente novamente mais tarde!",
                status: 200,
            };
        }

        return {
            failed: false,
            message: "Cupom atualizado com sucesso.",
            status: 200,
        };
    }

    public async UsageCouponUpdate(updatePayload: any) {
        const findCouponByID = await couponsRepository.findCouponByReference(updatePayload.coupon_reference);

        if (!findCouponByID) {
            return {
                failed: true,
                message: "Este cupom não existe. Tente novamente mais tarde!",
                status: 200,
            };
        }

        if (findCouponByID?.limited_used == findCouponByID?.used) {
            return {
                failed: true,
                message: "Seu cupom não teve modificação na quantidade de usos. Tente novamente mais tarde!",
                status: 200,
            };
        }

        const updatedCoupon = await couponsRepository.updateUsageCoupon(findCouponByID?.used, findCouponByID.reference);

        if (!updatedCoupon) {
            return {
                failed: true,
                message: "Seu cupom não foi atualizado. Tente novamente mais tarde!",
                status: 200,
            };
        }

        return {
            failed: false,
            message: "Cupom atualizado com sucesso.",
            status: 200,
        };
    }
}

export default new CouponsUpdateService()