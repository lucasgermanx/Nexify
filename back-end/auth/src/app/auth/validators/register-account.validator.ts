import { z } from "zod";

export const RegisterValidator = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "O email deve ser válido" })
    .min(1, { message: "O email é obrigatório" }),
  user_discord: z.string().optional(),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
  cpf: z.string().min(1, { message: "O CPF é obrigatório" }),
});
