import { z } from "zod";

export const MercadoPagoAddTokenValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }),
  token: z.string().min(1, { message: "O token do Mercado Pago é obrigatório" }),
});
