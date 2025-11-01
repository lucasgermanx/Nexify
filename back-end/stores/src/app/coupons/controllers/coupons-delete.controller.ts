import { Request, Response } from "express";

import CouponsDeleteService from "../services/coupons-delete.service";

class CouponsDeleteController {
    public async Delete(request: Request, response: Response) {
        try {
            const { coupon_reference } = request.body;
            const deleteCouponsService = await CouponsDeleteService.Delete({
                coupon_reference,
            });
            return response.status(deleteCouponsService.status).json(deleteCouponsService);
        } catch (error) {
            return response.json({
                failed: true,
                error:
                    "Não foi possível deletar o seu cupom! Tente novamente mais tarde!",
            });
        }
    }
}

export default new CouponsDeleteController();
