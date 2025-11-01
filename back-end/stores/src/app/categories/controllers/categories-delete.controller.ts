import { ICategoryDelete } from '@/interfaces/categories/categories-delete.interface';
import { Request, Response } from 'express';
import { CategoriesDeleteService } from '../services/categories-delete.service';
import { CategoryDeleteValidator } from '../validators/categories-delete.validator';

export const CategoriesDeleteController = async (request: Request<{}, {}, ICategoryDelete>, response:Response) => {
    try {
        const dataPayload = CategoryDeleteValidator.parse(request.body)
        return response.json(await CategoriesDeleteService(dataPayload))
    } catch (error) {
        return response.json({
            failed: true,
            error: "Não foi possível realizar a criação da sua categoria! Tente novamente mais tarde!",
        });
    }
}