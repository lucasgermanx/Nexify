import { IProductDelete } from "@/interfaces/products/products-delete.interface";
import productsRepository from "../repositories/products.repository";

export const ProductsDeleteService = async (dataPayload: IProductDelete) => {
    const findProduct = await productsRepository.findProductByReference(dataPayload.store_reference, dataPayload.product_reference)

    if (!findProduct) {
        return {
            failed: true,
            status: 401,
            message: "Não foi possível deletar seu produto! Tente novamente mais tarde!",
        };
    }

    const deleteProduct = await productsRepository.deleteProduct(dataPayload.product_reference)

    if (!deleteProduct) {
        return {
            failed: true,
            status: 500,
            message: "Não foi possível deletar seu produto! Tente novamente mais tarde!",
        };
    }

    return {
        failed: false,
        status: 200,
        message: "Produto deletado com sucesso.",
    };
}