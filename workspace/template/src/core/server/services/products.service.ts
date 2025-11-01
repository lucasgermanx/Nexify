import { IProductResponse, IVariablesResponse } from "../@types/products.type";

import axiosConfig from "@/global/axios/axios.config";

class ProductsService {
  public async getProductsData(store_reference: string, page:string, pageSize:string): Promise<IProductResponse> {
    const response = await axiosConfig.get(`/store/products/template/${store_reference}/?page=${page}&size=${pageSize}`);

    return response.data;
  }

  public async filterProducts(store_reference: string, filter:string, page:string, pageSize:string): Promise<IProductResponse> {
    const response = await axiosConfig.get(`/store/products/filter/${store_reference}/${filter}?page=${page}&size=${pageSize}`);

    return response.data;
  }

  public async filterVariables(store_reference: string, filter:string): Promise<IVariablesResponse> {
    const response = await axiosConfig.get(`/store/variables/${store_reference}?filter=${filter}`);

    return response.data;
  }

//   public async filterCouponData(token: string, store_reference: string, value:string, page:string, pageSize:string): Promise<ICouponsResponse> {
//     const response = await axiosConfig.get(`coupons/filter/${store_reference}/${value}/?page=${page}&size=${pageSize}`, {
//       headers: {
//         authorization: `${token}`,
//       },
//     });

//     return response.data;
//   }
}

export default new ProductsService()