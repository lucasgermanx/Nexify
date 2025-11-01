import { z } from "zod";

export const CategoryDeleteValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }).trim(),
  category_reference: z.string().min(1, { message: "A referência da categoria é obrigatória" }).trim(),
});
