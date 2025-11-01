import { z } from "zod";

export const StoreUpdateValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }),
  store_name: z.string().min(1, { message: "O nome da loja é obrigatório" }),
  store_subdomain: z.string().min(1, { message: "O subdomínio da loja é obrigatório" }),
  store_domain: z.string().min(1, { message: "O domínio da loja é obrigatório" }).optional(),
  maintenance: z.boolean().optional()
});
