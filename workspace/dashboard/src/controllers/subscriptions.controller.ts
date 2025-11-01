import { SubscriptionResponse } from "@/@types/subscriptions.type";
import subscriptionService from "@/services/subscription.service";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class SubscriptionController {
  public async getLastInvoiceByStore(store_reference:string): Promise<SubscriptionResponse | undefined> { 
    const token = cookies.get("fm_token");
    if (!token) return undefined;

    return await subscriptionService.getLastInvoiceByStore(token, store_reference);
  }
}

export default new SubscriptionController();
