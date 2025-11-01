import { Request, Response } from "express";

import PostsService from "../services/posts.service";

class PostsController {
  public async Index(request: Request, response: Response) {
    try {
      const {store_reference} = request.params
      const page = parseInt(request.query.page as string) || 1;
      const size = parseInt(request.query.size as string) || 1;
      
      const IndexService = await PostsService.Index(store_reference, page, size);
      return response.status(IndexService.status).json(IndexService);
    } catch (error) {
      console.log(error)
      return response.json({
        failed: true,
        error: "Não foi possível prosseguir com essa operação! Tente novamente mais tarde.",
      });
    }
  }

   public async GetPostByReference(request: Request, response: Response) {
    try {
      const { store_reference, post_reference } = request.params;
      const post = await PostsService.GetPostByReference(store_reference, post_reference)
      return response.status(post.status).json(post);
    } catch (error) {
      return response.json({
        failed: true,
        error: "Não foi possível prosseguir com essa operação! Tente novamente mais tarde.",
      });
    }
  }
}

export default new PostsController();
