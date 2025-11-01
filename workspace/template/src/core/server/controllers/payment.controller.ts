import { ICart, IPaymentResponse } from "../@types/payments.type";

import paymentService from "../services/payment.service";

class PaymentController {
  public async MercadoPagoGenerateLink(data:ICart): Promise<IPaymentResponse | undefined> { 
      return await paymentService.MercadoPagoGenerateLink(data);
  }

  public async PicPayGenerateLink(data:ICart): Promise<IPaymentResponse | undefined> { 
    return await paymentService.PicPayGenerateLink(data);
}
}

export default new PaymentController();
