import { IProductCreate } from "@/interfaces/products/products-create.interface";
import productsRepository from "../repositories/products.repository";

export const ProductsCreateService = async (dataPayload: IProductCreate) => {
    const findProduct = await productsRepository.findProductByName(dataPayload.product_name, dataPayload.store_reference)

    if (findProduct.length !== 0) {
        return {
            failed: true,
            status: 200,
            message: "Falha ao criar o produto: o título já está em uso em outro produto. Por favor, escolha um título único.",
        };
    }

    const createdProduct = await productsRepository.createProduct(dataPayload)

    if (!createdProduct) {
        return {
            status: 500,
            failed: true,
            message: "Falha ao criar o produto: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
        };
    }

    return {
        failed: false,
        message: "Produto criado com sucesso.",
        status: 200,
    };
}