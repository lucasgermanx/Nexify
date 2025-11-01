import { z } from "zod";

export const LoginValidator = z.object({
  email: z
    .string()
    .email({ message: "O email deve ser válido" })
    .min(1, { message: "O email é obrigatório" }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória" }),
});
