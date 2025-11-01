import { IVariables } from "@/interfaces/variables/variables.interface";
import variablesRepository from "../repositories/variables.repository";

export const VariablesService = async (dataPayload: IVariables) => {
    const skip = (parseInt(dataPayload.page) - 1) * parseInt(dataPayload.pageSize);
    const totalCount = await variablesRepository.totalCount(dataPayload.store_reference)

    if (totalCount === 0) {
        return {
            failed: false,
            status: 200,
            message: "Nenhuma variável encontrada.",
            categories: []
        };
    }

    const findVariables = await variablesRepository.findVariablesPagination(dataPayload.store_reference, skip, dataPayload.pageSize, dataPayload.filter)

    const hasMoreResults = totalCount > dataPayload.page + skip;
    const paginationCount = Math.ceil(totalCount / parseInt(dataPayload.pageSize));

    return {
        failed: false,
        variables: findVariables,
        message: "Variaveis carregadas com sucesso.",
        status: 200,
        paginationCount,
        hasMoreResults,
    };
}