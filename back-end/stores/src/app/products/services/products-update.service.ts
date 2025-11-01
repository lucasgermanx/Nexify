import { IProductUpdate } from "@/interfaces/products/products-update.interface";
import productsRepository from "../repositories/products.repository";

export const ProductsUpdateService = async (dataPayload: IProductUpdate) => {
    const findProduct = await productsRepository.findProductByName(dataPayload.store_reference, dataPayload.product_name)

    if (findProduct?.length != 0) {
        if (findProduct[0].product_refernece != dataPayload.product_reference) {
            return {
                failed: true,
                status: 200,
                message: "Falha ao atualizar: o nome do produto já está em uso em outro. Por favor, escolha um nome único.",
            };

        }
    }

    const findProductByReference = await productsRepository.findProductByReference(dataPayload.store_reference, dataPayload.product_reference)

    if (!findProductByReference) {
        return {
            failed: true,
            status: 401,
            message: "Não foi possível realizar a atualização do seu produto! Tente novamente mais tarde!",
        };
    }

    const updateProduct = await productsRepository.updateProduct(dataPayload)

    if (!updateProduct) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao atualizar o produto: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Produto atualizado com sucesso!",
        status: 200
    };
}