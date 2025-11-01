import { z } from "zod";

export const CategoriesValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }),
  page: z.string().min(1, { message: "Page é um parametro obrigatório" }),
  pageSize: z.string().min(1, { message: "A referência da loja é obrigatória" }),
  filter:z.string().optional()
});
