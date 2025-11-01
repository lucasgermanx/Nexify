import { ICategoryCreate } from '@/interfaces/categories/categories-create.interface';
import { Request, Response } from 'express';
import { CategoriesCreateService } from '../services/categories-create.service';
import { CategoryCreateValidator } from '../validators/categories-create.validator';

export const CategoriesCreateController = async (request: Request<{}, {}, ICategoryCreate>, response:Response) => {
    try {
        const dataPayload = CategoryCreateValidator.parse(request.body)
        return response.json(await CategoriesCreateService(dataPayload))
    } catch (error) {
        console.log(error)
        return response.json({
            failed: true,
            error: "Não foi possível realizar a criação da sua categoria! Tente novamente mais tarde!",
        });
    }
}