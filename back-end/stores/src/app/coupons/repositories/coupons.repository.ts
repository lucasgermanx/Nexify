import { Prisma } from "@/config/prisma.config";
import { ICouponCreatePayload } from "@/interfaces/coupons/coupons.interface";
import { generateReferenceUtils } from "@/utils/generate-reference.utils";

class CouponsRepository {
    async findCouponByStoreReference(store_reference: string, coupon: string) {
        return await Prisma.coupons.findMany({
            where: {
                store_reference: store_reference,
                OR: [{ coupon: coupon }, { reference: coupon }],
                deletedAt: null
            }
        });
    }

    async couponCreate(createPayload: ICouponCreatePayload) {
        return Prisma.coupons.create({
            data: {
                reference: generateReferenceUtils('coupon'),
                ...createPayload,
            },
        });
    }

    async findCouponByReference(coupon_reference: string) {
        return await Prisma.coupons.findFirst({
            where: { reference: coupon_reference, deletedAt: null },
        });
    }

    async deleteCoupon(id: number) {
        return await Prisma.coupons.update({
            where: {
                id: id
            },
            data: {
                deletedAt: new Date()
            }
        },
        );
    }

    async updateCoupon(updatePayload: any, coupon_reference: string) {
        return await Prisma.coupons.update({
            where: {
                reference: coupon_reference,
            },
            data: {
                ...updatePayload,
            },
        });
    }

    async updateUsageCoupon(usage: number, coupon_reference: string) {
        return await Prisma.coupons.update({
            where: {
                reference: coupon_reference,
            },
            data: {
                used: usage + 1,
            },
        });
    }

    async totalCount(store_reference: string) {
        return await Prisma.coupons.count({
            where: {
                store_reference: store_reference,
                deletedAt: null
            },
        });
    }

    async totalCountFilter(store_reference: string, filterPayload: string) {
        return await Prisma.coupons.count({
            where: {
                store_reference: store_reference,
                deletedAt: null,
                OR: [{ coupon: { contains: filterPayload } }, { reference: { contains: filterPayload } }]
            },
        });
    }

    async getCoupons(store_reference: string, skip: number, pageSize: number) {
        return await Prisma.coupons.findMany({
            where: { store_reference: store_reference, deletedAt: null },
            skip,
            take: pageSize,
        });
    }

    async filterCoupons(filterPayload: string, store_reference: string, skip: number, pageSize: number) {
        return await Prisma.coupons.findMany({
            where: {
                store_reference: store_reference,
                OR: [
                    { coupon: { contains: filterPayload } },
                    { reference: { contains: filterPayload } }
                ],
                deletedAt: null
            },
            skip,
            take: pageSize,
        });
    }

    async getCoupon(store_reference: string, coupon:string) {
        return await Prisma.coupons.findFirst({
            where: { 
                store_reference: store_reference, 
                deletedAt: null 
            },
        });
    }
}

export default new CouponsRepository();
