import { ResponseHandler } from "@/types/response.handler.type";
import postsRepository from "./repositories/posts.repository";

class PostsDeleteService {
    public async Delete(deletePayload: any):Promise<ResponseHandler>{
        const findPost = await postsRepository.findPostByReference(deletePayload.store_reference, deletePayload.post_reference);

        if (findPost?.length == 0) {
            return { 
                status: 500, 
                failed: true, 
                message: "Não foi possível excluir a postagem. Por favor, tente novamente mais tarde ou entre em contato com o suporte." 
            };
        }
    
        const deletePost = await postsRepository.delete(deletePayload.store_reference, deletePayload.post_reference)
    
        if(!deletePost){
            return {
                status: 500,
                failed: true,
                message: "Falha ao deletar postagem: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
            };
        }

        return { 
            failed: false, 
            status: 200, 
            message: "Postagem excluída com sucesso." 
        };
    }    
}


export default new PostsDeleteService()