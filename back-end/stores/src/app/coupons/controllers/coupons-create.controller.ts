import { Request, Response } from 'express';

import CouponsCreateService from '../services/coupons-create.service';
import { CouponCreateValidator } from '../validators/coupons.validator';

class CouponsCreateController {
    public async Create(request:Request, response:Response ){
      try {
        const createPayload = await CouponCreateValidator.validate(request.body)
        const CreateService = await CouponsCreateService.Create(createPayload)
        return response.status(CreateService.status).json(CreateService);
      } catch (error) {
        return response.json({
          failed: true,
          error: "Não foi possível realizar a criação do seu cupom! Tente novamente mais tarde!",
        });
      }
    }
}

export default new CouponsCreateController()    