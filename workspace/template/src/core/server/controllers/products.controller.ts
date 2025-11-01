import { IProductResponse, IVariablesResponse } from "../@types/products.type";

import productsService from "../services/products.service";

class ProductsController {
  public async getProducts(store_reference:string, page:string, pageSize:string): Promise<IProductResponse | undefined> { 
      return await productsService.getProductsData(store_reference, page, pageSize);
  }

  public async filterProducts(store_reference:string, filter:string, page:string, pageSize:string): Promise<IProductResponse | undefined> { 
    return await productsService.filterProducts(store_reference, filter, page, pageSize);
  }

  public async filterVariables(store_reference:string, filter:string): Promise<IVariablesResponse | undefined> { 
    return await productsService.filterVariables(store_reference, filter);
  }

//   public async filterCoupon(store_reference:string, value:string, page:string, pageSize:string): Promise<ICouponsResponse | undefined> { 
//     try {
//       const token = cookies.get("fm_token");
//       if (!token) return undefined;

//       return await couponsService.filterCouponData(token, store_reference, value, page, pageSize);
//     } catch (error) {
//       console.error("Erro ao obter o usuário:", error);
//       throw error;
//     }
//   }
}

export default new ProductsController();
