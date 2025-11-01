import { z } from "zod";

export const StoreCreateValidator = z.object({
  user_reference: z.string().min(1, { message: "A referência do usuário é obrigatória" }),
  customer_reference: z.string().min(1, { message: "Dado do usuário é obrigatório" }),
  store_name: z.string().min(1, { message: "O nome da loja é obrigatório" }),
  store_subdomain: z.string().min(1, { message: "O subdomínio da loja é obrigatório" }),
  store_money_type: z.string().min(1, { message: "O tipo de moeda da loja é obrigatório" }),
  store_plan: z.enum(["Starter", "Common", "Enterprise"])
});
