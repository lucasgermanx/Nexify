import { IPagination } from "./general.type";

export interface IPosts {
  id: number;
  user_reference: string;
  post_reference: string;
  store_reference: string;
  post_title: string;
  post_description: string;
  post_image: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostResponse {
  failed: boolean;
  posts: IPosts[];
  post?: IPosts;
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}


export type BlogContextType = {
  posts: IPosts[] | [] | undefined;
  post: IPosts | undefined,
  ProviderFilterPost: (filter: string) => void;
  paginationFilter: IPagination | undefined;
  ProviderGetAllPosts: (page: string) => void;
};
