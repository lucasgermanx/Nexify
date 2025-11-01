import { ICategoryDelete } from "@/interfaces/categories/categories-delete.interface";
import categoriesRepository from "../repositories/categories.repository";

export const CategoriesDeleteService = async (dataPayload: ICategoryDelete) => {
    const getCategoryByReference = await categoriesRepository.findCategoryByReference(dataPayload.category_reference)

    if (!getCategoryByReference) {
        return {
            failed: true,
            status: 200,
            message: "Falha ao deletar a categoria: Houve um problema interno ao realizar essa ação! Tente novamente mais tarde.",
        };
    }

    const createCategory = await categoriesRepository.deleteCategory(dataPayload)

    if (!createCategory) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao excluir a categoria: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Categoria deletada com sucesso.",
        status: 200,
    };
}