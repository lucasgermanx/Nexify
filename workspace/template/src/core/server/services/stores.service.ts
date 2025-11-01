import axiosConfig from "@/global/axios/axios.config";
import { StoreResponse } from "../@types/store.type";

class StoreService {
  public async getStoreData(addres:string): Promise<StoreResponse> {
    const response = await axiosConfig.get(`/store/${addres}`);
    return response.data as StoreResponse;
  }
}

export default new StoreService()