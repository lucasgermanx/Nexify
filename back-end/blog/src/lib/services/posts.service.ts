import { Prisma } from "@/config/prisma.config";
import { ResponseHandler } from "@/types/response.handler.type";
import postsRepository from "./repositories/posts.repository";

class PostsService {
  public async Index(store_reference:string, page: number, pageSize: number):Promise<ResponseHandler>{
      if (page <= 0 || pageSize <= 0) {
        return { 
          status:500,
          failed: true, 
          message: "Verifique os parametros informados!" 
        };
      }

      const skip = (page - 1) * pageSize;

      const totalCount = await Prisma.posts.count({
        where: {
          store_reference: store_reference,
        },
      })

      if (totalCount === 0) {
        return { 
          failed: false,
          status:200,
          message: "No news found.",
          posts: []
        };
      }

      const findPosts = await Prisma.posts.findMany({
        where: { store_reference: store_reference },
        skip,
        take: pageSize,
      });

      const hasMoreResults = totalCount > pageSize + skip;
      const paginationCount = Math.ceil(totalCount / pageSize);

      if (findPosts.length === 0) {
        return {
          failed: true,
          status: 500,
          message: "Não foi possível carregar as postagens.",
        };
      }

      return {
        failed: false,
        posts: findPosts,
        message: "Postagens carregadas com sucesso.",
        status: 200,
        paginationCount,
        hasMoreResults,
      };
    
  }

  public async GetPostByReference(store_reference: string, post_reference:string) {
    const findPost = await postsRepository.findPostByReference(store_reference, post_reference);

    if(!findPost){
      return {
        failed: false,
        status: 200,
        post: [],
        message: "Postagem carregada com sucesso.",
      };
    }

    return {
      failed:false,
      status: 200,
      post: findPost[0],
      mesage:"Postagem carregada com sucesso."
    }
  }
}

export default new PostsService();
