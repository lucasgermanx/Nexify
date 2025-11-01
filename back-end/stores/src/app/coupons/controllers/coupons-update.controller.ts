import { Request, Response } from 'express';
import couponsUpdateService from '../services/coupons-update.service';
import { CouponUpdateValidator, UsageCouponValidator } from '../validators/coupons.validator';

class CouponsUpdateController {
    public async Update(request: Request, response: Response) {
        try {
            const updatePayload = await CouponUpdateValidator.validate(request.body)
            const updateService = await couponsUpdateService.Update(updatePayload)
            return response.status(updateService.status).json(updateService);
        } catch (error) {
            return response.json({
                failed: true,
                error:
                    "Não foi possível atualizar o seu cupom! Tente novamente mais tarde!",
            });
        }
    }

    public async UsageCoupon(request: Request, response: Response) {
        try {
            const updatePayload = await UsageCouponValidator.validate(request.body)
            const updateService = await couponsUpdateService.UsageCouponUpdate(updatePayload)
            return response.status(updateService.status).json(updateService);
        } catch (error) {
            return response.json({
                failed: true,
                error:
                    "Não foi possível atualizar o seu cupom! Tente novamente mais tarde!",
            });
        }
    }
}

export default new CouponsUpdateController()