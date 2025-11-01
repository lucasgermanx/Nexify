import couponsRepository from "../repositories/coupons.repository";

class CouponsService {
    public async Index(store_reference: string, page: number, pageSize: number) {
        if (page <= 0 || pageSize <= 0) {
            return { failed: true, message: "Invalid page or pageSize values." };
        }

        const skip = (page - 1) * pageSize;

        const totalCount = await couponsRepository.totalCount(store_reference)

        const findCoupons = await couponsRepository.getCoupons(store_reference, skip, pageSize)

        const hasMoreResults = totalCount > pageSize + skip;
        const paginationCount = Math.ceil(totalCount / pageSize);

        if (findCoupons.length === 0) {
            return {
                failed: false,
                coupons: findCoupons,
                message: "Coupons loading successfully.",
                paginationCount,
                hasMoreResults,
            };
        }

        return {
            failed: false,
            coupons: findCoupons,
            message: "Coupons loading successfully.",
            paginationCount,
            hasMoreResults,
        };
    }

    public async Filter(filterPayload: string, store_reference: string, page: number, pageSize: number) {
        if (page <= 0 || pageSize <= 0) {
            return { failed: true, message: "Invalid page or pageSize values." };
        }

        const skip = (page - 1) * pageSize;

        const totalCount = await couponsRepository.totalCountFilter(store_reference, filterPayload)

        const findCoupons = await couponsRepository.filterCoupons(filterPayload, store_reference, skip, pageSize)

        const hasMoreResults = totalCount > pageSize + skip;
        const paginationCount = Math.ceil(totalCount / pageSize);

        if (findCoupons.length === 0) {
            return {
                failed: false,
                coupons: findCoupons,
                message: "Coupons loading successfully.",
                paginationCount,
                hasMoreResults,
            };
        }

        return {
            failed: false,
            coupons: findCoupons,
            message: "Coupons loading successfully.",
            paginationCount,
            hasMoreResults,
        };
    }

    public async GetByName(coupon_name: string, store_reference: string) {
        const findCoupons = await couponsRepository.findCouponByStoreReference(store_reference, coupon_name)

        if (findCoupons.length === 0) {
            return {
                failed: false,
                coupon: null,
                message: "Cupom carregado com sucesso",
            };
        }

        return {
            failed: false,
            coupon: findCoupons[0],
            message: "Cupom carregado com sucesso",
        };
    }
}

export default new CouponsService();
