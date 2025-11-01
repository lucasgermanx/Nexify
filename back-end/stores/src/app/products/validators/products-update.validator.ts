import { z } from "zod";

export const ProductsUpdateValidator = z.object({
    store_reference: z.string().min(1),
    product_reference: z.string().min(1),
    category_reference: z.string().min(1),
    product_name: z.string().min(1),
    product_description: z.string().min(1),
    product_price: z.string().min(1),
    product_price_discount: z.string().min(1),
    product_visibility: z.string().min(1),
    variables: z.string().min(1),
    product_stock: z.number().int().min(0),
    expire_day: z.string().min(1),
    product_image: z.string().min(1),
});