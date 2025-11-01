import { Request, Response } from 'express';

import PostsCreateService from '../services/posts-create.service';
import { PostsCreateValidator } from '../validators/posts.validators';

class PostsCreateController {

    public async Create(request:Request, response:Response ){
      try {
        const createPayload = await PostsCreateValidator.validate(request.body)

        if (!request.files || !(request.files as Express.Multer.File[]).length) {
          return response.status(400).send("Nenhuma imagem foi enviada.");
        }
  
        const files = request.files as Express.Multer.File[];
        const base64Images: string[] = files.map(file => file.buffer.toString("base64"));
        
        const CreateService = await PostsCreateService.Create({
          ...createPayload,
          images: base64Images,
        })
        return response.json(CreateService)
      } catch (error) {
        console.log(error)
        return response.json({
          failed: true,
          error: "Não foi possível prosseguir com a criação da sua postagem!",
        });
      }
    }
}

export default new PostsCreateController()