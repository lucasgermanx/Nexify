import { useBlog } from "@/core/client/providers/blog/blog.provider";
import { useForm } from "react-hook-form";

export const PostsActions = () => {
    const { register } = useForm();
    const { posts, paginationFilter, ProviderGetAllPosts} = useBlog();

    const handlePageChange = (pageNumber: string) => {
      ProviderGetAllPosts(pageNumber);
    };
    
    return { posts, paginationFilter, register, handlePageChange };
  };