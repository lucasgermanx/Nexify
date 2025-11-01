import { ICategories } from "@/interfaces/categories/categories-interface";
import categoriesRepository from "../repositories/categories.repository";

export const CategoriesStoreService = async (dataPayload: ICategories) => {
    const skip = (parseInt(dataPayload.page) - 1) * parseInt(dataPayload.pageSize);
    const totalCount = await categoriesRepository.totalCount(dataPayload.store_reference)

    if (totalCount === 0) {
        return {
            failed: false,
            status: 200,
            message: "Nenhuma categoria encontrada.",
            categories: []
        };
    }

    const findCategories = await categoriesRepository.findCategoriesPagination(dataPayload.store_reference, dataPayload.filter, skip, dataPayload.pageSize)

    const hasMoreResults = totalCount > dataPayload.pageSize + skip;
    const paginationCount = Math.ceil(totalCount / parseInt(dataPayload.pageSize));

    if (findCategories.length === 0) {
        return {
            failed: true,
            status: 500,
            message: "Não foi possível carregar as categorias.",
        };
    }

    return {
        failed: false,
        categories: findCategories,
        message: "Categorias carregadas com sucesso.",
        status: 200,
        paginationCount,
        hasMoreResults,
    };
}