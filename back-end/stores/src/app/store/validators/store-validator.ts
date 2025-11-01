import { z } from "zod";

export const StoreValidator = z.object({
  user_reference: z.string().min(1, { message: "A referência do usuário é obrigatória" }),
});
