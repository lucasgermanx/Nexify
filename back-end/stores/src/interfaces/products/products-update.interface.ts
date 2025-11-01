export interface IProductUpdate {
    store_reference: string,
    product_reference: string,
    category_reference: string,
    product_name: string;
    product_description: string;
    product_price: string;
    product_price_discount: string;
    product_visibility: string,
    variables: string
    product_stock: number
    expire_day: string,
    product_image: string,
}