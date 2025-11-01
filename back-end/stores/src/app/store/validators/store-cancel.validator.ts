import { z } from "zod";

export const StoreCancelValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }),
  customer_reference: z.string().min(1, { message: "Dado do usuário é obrigatório" }),
});
