/* eslint-disable */

import { IPagination, IResponseProvider } from "@/@types/general.type";
import React, { useContext, useState } from "react";

import { PropsProvider } from "@/core/@types/general.types";
import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import { createPostData, deletePostData, getPostsData, updatePostData } from "@/core/server/services/blog/blog.service";
import { toast } from "sonner";
import { BlogContextType, ICreatePost, IPosts, IUpdatePost } from "./blog-provider.types";

export const BlogContext = React.createContext<BlogContextType>(
    {} as BlogContextType
);

export const BlogProvider: React.FC<PropsProvider> = ({ children }) => {
    const [posts, setPosts] = useState<IPosts[] | []>()
    const [paginationFilter, setPaginationFilter] = useState<IPagination>()
    const {store_reference} = useManageStore()

    
    const ProviderGetAllPosts = async (page: string) => {
        try {
            const response = await getPostsData(store_reference, page ? page : '1', '12')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            setPosts(response.posts)
            setPaginationFilter({
              paginationCount: response.paginationCount,
              hasMoreResults: response.hasMoreResults
            })
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    const ProviderCreatePost = async (blog: ICreatePost) => {
        try {
            const response = await createPostData({store_reference, ...blog})
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            ProviderGetAllPosts('1')
            return toast.success(response.message);
        } catch (error) {
            return toast.error("Não foi possível criar sua postagem! Tente novamente mais tarde");
        }
    }

    const ProviderDeletePost = async (post_reference:string) => {
        try {
         const response = await deletePostData(post_reference, store_reference) as IResponseProvider
         
         if(response == undefined || response.failed == true){
           return toast.error(response.message || "Não foi possível deletar o seu post! Tente novamente mais tarde");
         }
         
         ProviderGetAllPosts('1')
         return toast.success(response.message);
        } catch (error) {
          return toast.error("Não foi possível deletar o seu post! Tente novamente mais tarde");
        }
    }

    const ProviderUpdatePost = async (blog: IUpdatePost) => {
        try {
            const response = await updatePostData({store_reference, ...blog})
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }
            ProviderGetAllPosts('1')
            return toast.success(response.message);
        } catch (error) {
            return toast.error("Não foi possível criar sua postagem! Tente novamente mais tarde");
        }
    }

    React.useEffect(()=>{
        ProviderGetAllPosts('1')
    }, [store_reference])

    return (
        <BlogContext.Provider value={{posts, paginationFilter, ProviderCreatePost, ProviderGetAllPosts, ProviderDeletePost, ProviderUpdatePost}}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => useContext(BlogContext);