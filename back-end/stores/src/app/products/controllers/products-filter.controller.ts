import { Request, Response } from "express";
import { ProductsFilterService } from "../services/products-filter.service";

export const ProductsFilterController = async (request: Request, response: Response) => {
    try {

        const { store_reference, filter} = request.params

        if(!store_reference && !filter){
            return response.json({
                failed: true,
                error: "Para continuar com essa operação você precisa informar uma loja!",
            });
        }

        const page = parseInt(request.query.page as string) || 1;
        const size = parseInt(request.query.size as string) || 1;

        const result = await ProductsFilterService(store_reference, filter, page, size);
        return response.status(result.status).json(result);
    } catch (error) {
        return response.json({
            failed: true,
            error: "Não foi possível realizar essa operação! Tente novamente mais tarde!",
        });
    }
}