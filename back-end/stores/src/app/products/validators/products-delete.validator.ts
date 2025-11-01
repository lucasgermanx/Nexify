import { z } from "zod";

export const ProductsDeleteValidator = z.object({
    store_reference: z.string().min(1),
    product_reference: z.string().min(1),
});