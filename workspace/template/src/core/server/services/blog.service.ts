import { IPostResponse } from "../@types/blog.type";
import axiosConfig from "@/global/axios/axios.config";

class BlogService {
  public async getPostsData(store_reference: string, page:string, pageSize:string): Promise<IPostResponse> {
    const response = await axiosConfig.get(`posts/${store_reference}/?page=${page}&size=${pageSize}`);

    return response.data;
  }

  public async filterPostData(store_reference: string, filter:string, ): Promise<IPostResponse> {
    const response = await axiosConfig.get(`post/${store_reference}/${filter}`);

    return response.data;
  }
}

export default new BlogService()