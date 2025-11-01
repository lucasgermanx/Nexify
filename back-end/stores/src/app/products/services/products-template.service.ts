import productsRepository from "../repositories/products.repository";

export const ProductsTemplateService = async (store_reference: string, page: number, pageSize: number) => {
    if (page <= 0 || pageSize <= 0) {
        return {
            status: 500,
            failed: true,
            message: "Verifique os parâmetros informados!"
        };
    }

    const skip = (page - 1) * pageSize;

    const totalCount = await productsRepository.totalCountTemplate(store_reference)

    if (totalCount === 0) {
        return {
            failed: false,
            status: 200,
            message: "Nenhum produto encontrado.",
            categories: []
        };
    }

    const findProducts = await productsRepository.findProductsPaginationTemplate(store_reference, skip, pageSize)

    const hasMoreResults = totalCount > pageSize + skip;
    const paginationCount = Math.ceil(totalCount / pageSize);

    if (findProducts.length === 0) {
        return {
            failed: true,
            status: 500,
            message: "Não foi possível carregar os produtos.",
        };
    }

    return {
        failed: false,
        products: findProducts,
        message: "Produtos carregados com sucesso.",
        status: 200,
        paginationCount,
        hasMoreResults,
    };
}