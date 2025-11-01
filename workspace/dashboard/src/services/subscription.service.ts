import { SubscriptionResponse } from "@/@types/subscriptions.type";
import axiosConfig from "@/config/axios.config";

class SubscriptionService {
  public async getLastInvoiceByStore(token: string, store_reference: string): Promise<SubscriptionResponse> {
    const response = await axiosConfig.get(`/subscriptions/client/${store_reference}`, {
      headers: {
        authorization: `${token}`,
      },
    });
    return response.data as SubscriptionResponse;
  }
}

export default new SubscriptionService()