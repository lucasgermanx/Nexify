import { ICategories } from '@/interfaces/categories/categories-interface';
import { Request, Response } from 'express';
import { CategoriesStoreService } from '../services/categories-store.service';
import { CategoriesValidator } from '../validators/categories.validator';

export const CategoriesController = async (request: Request<{}, {}, ICategories>, response:Response) => {
    try {
        console.log(request.query)
        const dataPayload = CategoriesValidator.parse(request.query)
        return response.json(await CategoriesStoreService(dataPayload))
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Algo deu errado. Por favor, tente novamente mais tarde ou entre em contato com o suporte se o problema persistir.",
        });
    }
}