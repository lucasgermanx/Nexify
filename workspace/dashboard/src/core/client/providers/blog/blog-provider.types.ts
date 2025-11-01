import { IPagination } from "@/@types/general.type";

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
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}

export interface ICreatePost {
  store_reference?: string;
  user_reference: string;
  post_title: string;
  post_description: string;
  images: File[];
  author: string;
}

export interface IUpdatePost {
  post_reference: string;
  store_reference?: string;
  user_reference: string;
  post_title: string;
  post_description: string;
  images: File[];
  author: string;
}

export type BlogContextType = {
  posts: IPosts[] | [] | undefined;
  paginationFilter: IPagination | undefined;
  ProviderCreatePost: (data: ICreatePost) => void;
  ProviderGetAllPosts: (page: string) => void;
  ProviderDeletePost: (post_reference: string) => void;
  ProviderUpdatePost: (data: IUpdatePost) => void;
};
