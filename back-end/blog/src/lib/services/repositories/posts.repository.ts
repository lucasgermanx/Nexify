import { Prisma } from "@/config/prisma.config";
import { postReferenceUtils } from "@/utils/post_reference";

class PostsRepository {
    public async findPostsByTitle(post_title:string, store_reference:string){
        return await Prisma.posts.findFirst({ 
            where: { post_title: post_title, store_reference: store_reference } 
        });
    }

    public async findPostByReference(store_reference:string, post_reference:string){
        return await Prisma.posts.findMany({
            where: { store_reference: store_reference, post_reference:post_reference}
        });
    }

    public async findPostByStore(store_reference:string){
        return await Prisma.posts.findMany({
            where: { store_reference: store_reference}
        });
    }

    public async create(createPayload:any){
        return  await Prisma.posts.create({
            data: {
                post_reference: postReferenceUtils(),
                user_reference:createPayload.user_reference,
                author: createPayload.author,
                store_reference: createPayload.store_reference,
                post_title: createPayload.post_title,
                post_description: createPayload.post_description,
                post_image: `${createPayload.images[0]}`,
            },
        });
    }

    public async delete(store_reference:string, post_reference:string){
        return await Prisma.posts.delete({ 
            where: { 
                store_reference: store_reference,
                post_reference: post_reference 
            } 
        });
    }
}

export default new PostsRepository()