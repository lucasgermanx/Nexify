/* eslint-disable */

import { BlogContextType, IPosts } from "@/core/server/@types/blog.type";
import React, { useState } from "react";

import { IPagination } from "@/core/server/@types/general.type";
import blogController from "@/core/server/controllers/blog.controller";
import storeReference from "../utils/set-store-reference.utils";
import { toast } from "sonner";

export const BlogContext = React.createContext<BlogContextType | null>(null);

export const BlogProvider = (props: any) => {
    const [posts, setPosts] = useState<IPosts[] | []>()
    const [post, setPost] = useState<IPosts | undefined>()
    const [paginationFilter, setPaginationFilter] = useState<IPagination>()
    const {store_reference} = storeReference()
    
    const ProviderGetAllPosts = async (page: string) => {
        try {
            if(!store_reference){
                return
            }
            
            const response = await blogController.getPosts(store_reference, page ? page : '1', '12')
            
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


    const ProviderFilterPost = async (filter:string) => {
        try {
            if(!store_reference){
                return
            }
            
            const response = await blogController.filterPost(store_reference, filter)
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível criar sua postagem. Tente novamente mais tarde!");
            }

            setPost(response.post)
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    React.useEffect(()=>{
        ProviderGetAllPosts('1')
    }, [store_reference])

    return (
        <BlogContext.Provider value={{posts, post, paginationFilter, ProviderGetAllPosts, ProviderFilterPost}}>
            {props.children}
        </BlogContext.Provider>
    );
};
