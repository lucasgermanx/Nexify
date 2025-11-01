"use client";

import { IStoreCreate } from "../@types/store.type";

class StoreService {
  public async StoreCreate(storeCreatePayload: IStoreCreate) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/store/create`,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_reference: storeCreatePayload.user_reference || 1,
          customer_reference: storeCreatePayload.customer_reference,
          store_name: storeCreatePayload.store,
          store_subdomain: storeCreatePayload.subdomain,
          store_money_type: storeCreatePayload.store_money_type,
          store_plan: storeCreatePayload.store_plan
         }),
      }
    );
    
    return await response.json();
  }
  
  public async CheckAvailability(subdomain:string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GATEWAY_URL}/store/${subdomain}.fivemarket.com.br`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    return await response.json();
  }
}

export default new StoreService();
