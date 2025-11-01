import { ICart, IPaymentResponse } from "../@types/payments.type";

import axiosConfig from "@/global/axios/axios.config";

class PaymentService {
  public async MercadoPagoGenerateLink(cart:ICart): Promise<IPaymentResponse> {
    const response = await axiosConfig.post('/store/mercadopago/generate-link' as string, cart);
    return response.data;
  }

  public async PicPayGenerateLink(cart:ICart): Promise<IPaymentResponse> {
    const response = await axiosConfig.post('/store/picpay/generate-link' as string, cart);
    return response.data;
  }
}

export default new PaymentService()