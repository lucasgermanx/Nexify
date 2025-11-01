import { ICategoriesResponse } from "../@types/categories.type";
import categoriesService from "../services/categories.service";

class CategoriesController {
  public async getCategories(store_reference:string, page:string, pageSize:string): Promise<ICategoriesResponse | undefined> { 
      return await categoriesService.getCategoriesData(store_reference, page, pageSize);
  }

  public async filterCategory(store_reference:string, filter:string, page:string, pageSize:string): Promise<ICategoriesResponse | undefined> { 
    return await categoriesService.filterCategoriesData(store_reference, filter, page, pageSize);
}
}

export default new CategoriesController();
