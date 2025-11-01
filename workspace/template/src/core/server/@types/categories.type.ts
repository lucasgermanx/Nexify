import { IPagination } from "./general.type";
import { IProducts } from "./products.type";

export interface ICategories {
    id: number;
    category_reference: string;
    store_reference: string;
    product_reference: string;
    category: string;
    category_slug: string;
    category_icon: string;
    createdAt: string;
    updatedAt: string;
    products: IProducts[]
}

export interface ICategoriesResponse {
    failed: boolean;
    categories: ICategories[];
    message: string;
    paginationCount: number;
    hasMoreResults: boolean;
  }

export type CategoriesContextType = {
    categories: ICategories[] | [] | undefined;
    products: IProducts[] | [] | undefined;
    category: ICategories | undefined;
    paginationFilter: IPagination | undefined;
    ProviderGetAllCategories: (page: string) => void;
    ProviderGetCategory: (page: string, filter:string) => void;
  };
  