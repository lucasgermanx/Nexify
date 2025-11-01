export interface ICreateProductData {
    images: File[];
    product_name: string;
    category_reference: string;
    product_price: string;
    product_price_discount: string;
    expire_day: string;
    product_visibility: string;
    product_stock: string;
    product_description: string;
    variables: string[];
}

export interface IDeleteProductData {
    product_reference: string;
    store_reference: string;
}

export interface IUpdateProductData extends ICreateProductData {
    product_reference: string;
}

export type ProductsContextType = {
    ProviderCreateProduct: (product: any) => void;
    ProviderDeleteProduct: (product_reference: string) => void;
    ProviderProductUpdate: (product: any) => void;
};
