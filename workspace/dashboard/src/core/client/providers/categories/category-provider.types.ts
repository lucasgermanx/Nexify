import { IPagination } from "@/@types/general.type";

export interface ICategory {
  category: string;
  category_slug?: string;
  store_id?: string | null;
  id?: string;
  products: any;
}

export interface CategoriesMap {
  [id: number]: ICategory;
}

export interface ICategoriesResponse {
  failed: boolean;
  categories: ICategory[];
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}

export interface ICategoryUpdate{
  store_reference?:string,
  category_reference:string,
  category: string,
  category_slug:string,
  category_icon:string
}

export interface ICategoryDelete{
  store_reference:string,
  category_reference:string,
}

export interface ICategoryCreate{
  store_reference?:string,
  category: string,
  category_icon:string
}

export type CategoriesContextType = {
  categories: ICategory[];
  paginationFilter: IPagination | undefined;
  ProviderGetAllCategories: (page:string) => void;
  ProviderUpdateCategory: (category: ICategoryUpdate) => void;
  ProviderCreateCategory: (category: ICategoryCreate) => void;
  ProviderDeleteCategory: (category_reference:string) => void;
};
