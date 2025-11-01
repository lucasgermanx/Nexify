"use serve";

import { IStoreCreate } from "../@types/store.type";
import storeService from "../services/store.service";

class StoreController {
  public async StoreCreate(storeCreatePayload: IStoreCreate) {
    const storeCreate = await storeService.StoreCreate(storeCreatePayload);
    return storeCreate;
  }
  public async CheckAvailability(subdomain: string) {
    const checkAvailability = await storeService.CheckAvailability(subdomain);
    return checkAvailability;
  }
}

export default new StoreController();
