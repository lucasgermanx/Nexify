import { Request, Response } from 'express';

import PostsDeleteService from '../services/posts-delete.service';

class PostsDeleteController {

    public async Delete(request: Request, response: Response) {
        try {
            const {store_reference, post_reference} = request.body;
            const deleteResult = await PostsDeleteService.Delete({ store_reference, post_reference });
            return response.status(deleteResult.status).json(deleteResult);
        } catch (error) {
            return response.json({
                failed: true,
                error: "Não foi possível prosseguir com a criação da sua postagem!",
              });
        }
    }
}

export default new PostsDeleteController();
