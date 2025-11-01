import { StoreResponse } from "../@types/store.type";
import storesService from "../services/stores.service";

class StoreController {
  public async getStore(address:string): Promise<StoreResponse | undefined> { 
    return await storesService.getStoreData(address);
  }
}

export default new StoreController();
