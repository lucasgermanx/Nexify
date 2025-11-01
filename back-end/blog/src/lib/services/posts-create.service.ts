import postsRepository from "./repositories/posts.repository";

class PostsCreateService {
    public async Create(createPayload: any) {
        const existingPost = await postsRepository.findPostsByTitle(createPayload.post_title, createPayload.store_reference);

        if (existingPost) {
            return {
                status: 400,
                failed: true,
                message: "Falha ao criar postagem: o título já está em uso em outra publicação. Por favor, escolha um título único.",
            };
        }

        const createdPost = await postsRepository.create(createPayload);

        if (!createdPost) {
            return {
                status: 500,
                failed: true,
                message: "Falha ao criar postagem: não foi possível concluir a operação no momento. Tente novamente mais tarde.",
            };
        }

        return {
            status: 201,
            failed: false,
            message: "Postagem criada com sucesso.",
        };
    }
}

export default new PostsCreateService();
