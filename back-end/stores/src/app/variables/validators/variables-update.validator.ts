import { z } from 'zod';

export const VariableUpdateValidator = z.object({
    store_reference: z.string().min(1, 'A referência da loja é obrigatória'),
    variable_reference: z.string().min(1, 'A referência da variável é obrigatória'),
    variable: z.string().min(1, 'A variável é obrigatória'),
    option_name: z.string().min(1, 'O nome da opção é obrigatório'),
    quantity: z.number().min(1, 'A quantidade é obrigatória'),
    commands: z.array(
        z.object({
            id: z.string().min(1, 'O ID do comando é obrigatório'),
            command: z.string().min(1, 'O comando é obrigatório'),
            command_value: z.string().min(1, 'O valor do comando é obrigatório'),
            status_payment: z.string().min(1, 'O status do pagamento é obrigatório'),
        })
    ).min(1, 'Pelo menos um comando é obrigatório')
});
