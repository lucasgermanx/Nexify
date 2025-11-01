import { ICategoryUpdate } from '@/interfaces/categories/categories-update.interface';
import { Request, Response } from 'express';
import { CategoriesUpdateService } from '../services/categories-update.service';
import { CategoryUpdateValidator } from '../validators/categories-update.validator';

export const CategoriesUpdateController = async (request: Request<{}, {}, ICategoryUpdate>, response:Response) => {
    try {
        const dataPayload = CategoryUpdateValidator.parse(request.body)
        return response.json(await CategoriesUpdateService(dataPayload))
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Não foi possível realizar a atualização da sua categoria! Tente novamente mais tarde!",
        });
    }
}