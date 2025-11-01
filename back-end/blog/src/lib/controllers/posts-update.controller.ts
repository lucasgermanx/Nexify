import { Request, Response } from 'express';

import PostsUpdateService from '../services/posts-update.service';
import { PostUpdateValidator } from '../validators/posts.validators';

class PostsUpdateController {

    public async Update(request: Request, response: Response) {
        try {
            const updatePayload = await PostUpdateValidator.validate(request.body);

            if (!request.files || !(request.files as Express.Multer.File[]).length) {
                return response.status(400).json({
                    failed: true,
                    status: 400,
                    message: "Nenhuma imagem foi enviada! Verifique e tente novamente."
                });
            }

            const files = request.files as Express.Multer.File[];
            const base64Images: string[] = files.map(file => file.buffer.toString("base64"));

            const updateService = await PostsUpdateService.Update({
                ...updatePayload,
                images: base64Images,
            });
            return response.status(updateService.status).json(updateService);
        } catch (error) {
            console.log(error)
            throw new Error(error as string);
        }
    }
}

export default new PostsUpdateController();
