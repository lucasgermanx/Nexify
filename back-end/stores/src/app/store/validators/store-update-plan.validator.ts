import { z } from "zod";

export const StorePlanUpdateValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }),
  store_plan: z.enum(["Starter", "Common", "Enterprise"]),
});
