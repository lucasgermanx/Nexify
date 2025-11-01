import { IPostResponse } from "../@types/blog.type";
import blogService from "../services/blog.service";

class BlogController {
  public async getPosts(store_reference:string, page:string, pageSize:string): Promise<IPostResponse | undefined> { 
      return await blogService.getPostsData(store_reference, page, pageSize);
  }

  public async filterPost(store_reference:string, filter:string): Promise<IPostResponse | undefined> { 
    return await blogService.filterPostData(store_reference, filter);
}
}

export default new BlogController();
