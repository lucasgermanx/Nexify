import { z } from 'zod';

export const VariableDeleteValidator = z.object({
    store_reference: z.string().min(1, 'A referência da loja é obrigatória'),
    variable_reference: z.string().min(1, 'A referência da variável é obrigatória'),
});
