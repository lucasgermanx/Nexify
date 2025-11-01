import { Request, Response } from "express";
import { ProductsTemplateService } from "../services/products-template.service";

export const ProductsTemplateController = async (request: Request, response: Response) => {
    try {

        const { store_reference } = request.params

        if(!store_reference){
            return response.json({
                failed: true,
                error: "Para continuar com essa operação você precisa informar uma loja!",
            });
        }

        const page = parseInt(request.query.page as string) || 1;
        const size = parseInt(request.query.size as string) || 1;

        const result = await ProductsTemplateService(store_reference, page, size);
        return response.status(result.status).json(result);
    } catch (error) {
        return response.json({
            failed: true,
            error: "Não foi possível realizar essa operação! Tente novamente mais tarde!",
        });
    }
}