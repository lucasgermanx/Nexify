import { Prisma } from "@/config/prisma.config";
import { ResponseHandler } from "@/types/response.handler.type";
import postsRepository from "./repositories/posts.repository";

class PostsUpdateService {
  public async Update(updatePayload: any) :Promise<ResponseHandler>{
    const existingPost = await postsRepository.findPostsByTitle(updatePayload.post_title, updatePayload.store_reference);

      if (existingPost) {
    if(existingPost.post_reference != updatePayload.post_reference){

        return {
            status: 400,
            failed: true,
            message: "Falha ao atualizar postagem: o título já está em uso em outra publicação. Por favor, escolha um título único.",
        };
    }
    }

    const findPost = await postsRepository.findPostByReference(updatePayload.store_reference, updatePayload.post_reference);
        if (findPost?.length == 0) {
            return { 
                status: 500, 
                failed: true, 
                message: "Não foi possível atualizar a postagem. Por favor, tente novamente mais tarde ou entre em contato com o suporte." 
            };
        }

      // Realiza a atualização dos dados
      const updatedPost = await Prisma.posts.update({
        where: {
          post_reference: updatePayload.post_reference,
        },
        data: {
          post_title: updatePayload.post_title,
          post_description: updatePayload.post_description,
          post_image: updatePayload.images[0],
      },
      });

      return { 
        failed: false, 
        status: 200, 
        message: "Post atualizado com sucesso." 
    };
  }
}

export default new PostsUpdateService();
