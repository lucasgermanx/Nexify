import { Request, Response } from "express";

import couponsService from "../services/coupons.service";

class CouponsController {
    public async Index(request: Request, response: Response) {
        try {
            const { store } = request.params
            const page = parseInt(request.query.page as string) || 1;
            const size = parseInt(request.query.size as string) || 1;

            const IndexService = await couponsService.Index(store, page, size);
            return response.json(IndexService);
        } catch (error) {
            return response.json({
                failed: true,
                error:
                    "Não foi possível exibir os seus cupons! Tente novamente mais tarde!",
            });
        }
    }

    public async Filter(request: Request, response: Response) {
        try {
            const { store, coupon } = request.params
            const page = parseInt(request.query.page as string) || 1;
            const size = parseInt(request.query.size as string) || 1;

            const IndexService = await couponsService.Filter(coupon, store, page, size);
            return response.json(IndexService);
        } catch (error) {
            return response.json({
                failed: true,
                error:
                    "Não foi possível exibir os seus cupons! Tente novamente mais tarde!",
            });
        }
    }

    public async GetCouponByName(request: Request, response: Response) {
        try {
            const { store_reference, coupon } = request.params
            const IndexService = await couponsService.GetByName(coupon, store_reference);
            return response.json(IndexService);
        } catch (error) {
            return response.json({
                failed: true,
                error:
                    "Não foi possível exibir os seus cupons! Tente novamente mais tarde!",
            });
        }
    }
}

export default new CouponsController();
