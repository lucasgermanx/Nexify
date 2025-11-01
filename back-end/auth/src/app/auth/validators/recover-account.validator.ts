import { z } from "zod";

export const RecoverValidator = z.object({
    email: z
        .string()
        .email({ message: "O email deve ser válido" })
        .min(1, { message: "O email é obrigatório" }),
});


export const TokenValidator = z.object({
    token: z.string().min(1, { message: "O token é obrigatório" }),
    email: z
        .string()
        .email({ message: "O email deve ser válido" })
        .min(1, { message: "O email é obrigatório" }),
});



export const ResetPasswordValidator = z.object({
  email: z
    .string()
    .email({ message: "O email deve ser válido" })
    .min(1, { message: "O email é obrigatório" }),
  token: z.string().min(1, { message: "O token é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
  confirm_password: z
    .string()
    .min(1, { message: "A confirmação de senha é obrigatória" }),
});
