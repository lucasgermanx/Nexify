import { ICategoryCreate } from "@/interfaces/categories/categories-create.interface";
import categoriesRepository from "../repositories/categories.repository";

export const CategoriesCreateService = async (dataPayload: ICategoryCreate) => {
    const getCategory = await categoriesRepository.findCategory(dataPayload.store_reference, dataPayload.category)

    if (getCategory.length !== 0) {
        return {
            failed: true,
            status: 200,
            message: "Falha ao criar a categoria: o título já está em uso em outra categoria. Por favor, escolha um título único.",
        };
    }

    const createCategory = await categoriesRepository.create(dataPayload)

    if (!createCategory) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao criar a categoria: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Categoria criada com sucesso.",
        status: 200,
    };
}