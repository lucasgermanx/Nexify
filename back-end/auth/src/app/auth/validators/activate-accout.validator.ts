import { z } from "zod";

export const ActivateValidator = z.object({
  token: z.string().min(1, { message: "O token é obrigatório" }),
  email: z
    .string()
    .email({ message: "O email deve ser válido" })
    .min(1, { message: "O email é obrigatório" }),
});


export const ResentActivateValidator = z.object({
  email: z
    .string()
    .email({ message: "O email deve ser válido" })
    .min(1, { message: "O email é obrigatório" }),
});
