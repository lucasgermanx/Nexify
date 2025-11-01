import { ICategoryUpdate } from "@/interfaces/categories/categories-update.interface";
import categoriesRepository from "../repositories/categories.repository";

export const CategoriesUpdateService = async (dataPayload: ICategoryUpdate) => {
    const getCategory = await categoriesRepository.findCategory(dataPayload.store_reference, dataPayload.category)
    const getCategoryByReference = await categoriesRepository.findCategoryByReference(dataPayload.category_reference)

    console.log(getCategory)

    if (getCategory.length !== 0 && getCategory[0].category_reference != dataPayload.category_reference || !getCategoryByReference) {
        return {
            failed: true,
            status: 200,
            message: "Falha ao atualizar a categoria: o título já está em uso em outra categoria. Por favor, escolha um título único.",
        };
    }

    const updateCategory = await categoriesRepository.updateCategory(dataPayload)

    if (!updateCategory) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao atualizar a categoria: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Categoria atualizada com sucesso.",
        status: 200,
    };
}