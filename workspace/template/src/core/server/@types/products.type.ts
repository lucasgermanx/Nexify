import { IPagination } from "./general.type";

export interface IProducts {
    id: number;
    category_reference: string;
    store_reference: string;
    product_reference: string;
    product_name: string;
    product_description: string;
    product_price: string;
    product_price_discount: string;
    product_visibility: string;
    product_stock: number;
    expire_day: string;
    product_image: string;
    variables: string;
    createdAt: string;
    updatedAt: string;
}

export interface IVariables{
  store_reference:string,
  variable_reference:string
  variable: string,
  command: string,
  command_value: string,
  option_name: string
  createdAt: string;
  updatedAt: string;
}

export interface IProductResponse {
    failed: boolean;
    products: IProducts[];
    message: string;
    paginationCount: number;
    hasMoreResults: boolean;
}

export interface IVariablesResponse {
  failed: boolean;
  variables: IVariables[];
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}

export type ProductContextType = {
    products: IProducts[] | [] | undefined;
    filterProducts: IProducts[] | [] | undefined;
    productsWithOffer: IProducts[] | [] | undefined;
    paginationFilter: IPagination | undefined;
    variables: IVariables[] | [] | undefined;
    ProviderGetAllProducts: (page: string) => void;
    ProviderGetProduct: (page: string, filter:string) => void;
    ProviderGetVariableByProduct: (filter:string) => void;
  };
  