import { IVariablesCreate } from "@/interfaces/variables/variables-create.interface";
import variablesRepository from "../repositories/variables.repository";

export const VariablesCreateService = async (dataPayload: IVariablesCreate) => {
    const variablesExisting = await variablesRepository.findVariableByVariable(dataPayload.store_reference, dataPayload.variable)

    if (variablesExisting.length !== 0) {
        return {
            failed: true,
            status: 200,
            message: "Falha ao criar a variável: a variável já está em uso. Por favor, escolha um título único.",
        };
    }

    const createVariable = await variablesRepository.createVariable(dataPayload)

    if (!createVariable) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao criar a variável: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Variável criada com sucesso.",
        status: 200,
    };
}