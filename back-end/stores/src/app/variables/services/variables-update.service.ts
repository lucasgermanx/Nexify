import { Prisma } from "@/config/prisma.config";
import { IVariableUpdate } from "@/interfaces/variables/variables-create.interface";
import variablesRepository from "../repositories/variables.repository";

export const VariablesUpdateService = async (updatePayload: IVariableUpdate) => {
    const findVariable = await variablesRepository.findVariableByVariable(updatePayload.store_reference, updatePayload.variable)

    if (findVariable?.length != 0) {
        if (findVariable[0].variable_reference != updatePayload.variable_reference) {
            return {
                failed: true,
                status: 200,
                message: "Falha ao atualizar a sua variável: o título já está em uso em outra categoria. Por favor, escolha um título único.",
            };

        }
    }

    const findVariableByReference = await variablesRepository.findVariableByReference(updatePayload.store_reference, updatePayload.variable_reference)

    if (findVariableByReference.length == 0) {
        return {
            failed: true,
            status: 401,
            message: "Não foi possível realizar a atualização da sua variável! Tente novamente mais tarde!",
        };
    }


    const updateVariable = await Prisma.variables.update({
        where: {
            variable_reference: updatePayload.variable_reference,
        },
        data: {
            variable: updatePayload.variable,
            option_name: updatePayload.option_name,
            quantity: updatePayload.quantity,
            commands: JSON.stringify(updatePayload.commands)
        },
    });

    if (!updateVariable) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao atualizar a variável: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Variável atualizada com sucesso!",
        status: 200
    };
}