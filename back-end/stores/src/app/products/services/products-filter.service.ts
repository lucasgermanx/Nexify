import productsRepository from "../repositories/products.repository";

export const ProductsFilterService = async (store_reference: string, filter: string, page: number, pageSize: number) => {
    if (page <= 0 || pageSize <= 0) {
        return {
            status: 500,
            failed: true,
            message: "Verifique os parâmetros informados!"
        };
    }

    const skip = (page - 1) * pageSize;
    const totalCount = await productsRepository.totalCountFilter(store_reference, filter)

    if (totalCount === 0) {
        return {
            failed: false,
            status: 200,
            message: "Nenhum produto encontrado.",
            products: []
        };
    }

    const findCategories = await productsRepository.filterProducts(filter, store_reference, skip, pageSize)

    const hasMoreResults = totalCount > pageSize + skip;
    const paginationCount = Math.ceil(totalCount / pageSize);

    return {
        failed: false,
        products: findCategories,
        message: "Produto carregado com sucesso.",
        status: 200,
        paginationCount,
        hasMoreResults,
    };
}