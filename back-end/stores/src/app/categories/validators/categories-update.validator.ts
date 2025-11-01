import { z } from "zod";

export const CategoryUpdateValidator = z.object({
  store_reference: z.string().min(1, { message: "A referência da loja é obrigatória" }).trim(),
  category_reference: z.string().min(1, { message: "A referência da categoria é obrigatória" }).trim(),
  category: z
    .string()
    .min(3, { message: "A categoria deve conter no mínimo 3 caracteres" })
    .max(12, { message: "A categoria deve conter no máximo 12 caracteres" })
    .trim(),
  category_slug: z
    .string()
    .min(1, { message: "O slug da categoria é obrigatório" })
    .max(12, { message: "O slug da categoria deve conter no máximo 12 caracteres" })
    .trim(),
  category_icon: z.string().min(1, { message: "O ícone da categoria é obrigatório" }).trim(),
});
