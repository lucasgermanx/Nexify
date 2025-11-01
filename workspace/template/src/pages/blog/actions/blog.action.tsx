/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */

import useBlog from "@/core/client/hooks/blog.hook";

export const blogAction = () => {
  const { posts, paginationFilter, ProviderGetAllPosts } = useBlog();
  const postsHome = posts?.filter((item: any) => item).slice(1, 6);
  const uniquePost = posts?.filter((item: any) => item).slice(0, 1);
  
  const handlePageChange = (pageNumber: string) => {
    ProviderGetAllPosts(pageNumber)
  };

  return {postsHome, uniquePost, handlePageChange, paginationFilter};
};
