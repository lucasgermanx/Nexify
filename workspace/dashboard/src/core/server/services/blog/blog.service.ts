import { IResponseProvider } from "@/@types/general.type";
import { ICreatePost, IPostResponse, IUpdatePost } from "@/core/client/providers/blog/blog-provider.types";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get authentication headers
const getAuthHeaders = () => {
    const token = cookies.get("fm_token");
    return token ? { authorization: token } : undefined;
};

// Get posts data
export const getPostsData = async (store_reference: string, page: string, pageSize: string): Promise<IPostResponse> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.get(`${API_URL}/posts/${store_reference}/?page=${page}&size=${pageSize}`, { headers });
    return response.data as IPostResponse;
};

// Delete post
export const deletePostData = async (post_reference: string, store_reference: string): Promise<IResponseProvider> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/posts/delete`, { post_reference, store_reference }, { headers });
    return response.data as IResponseProvider;
};

// Update post
export const updatePostData = async (data: IUpdatePost): Promise<IResponseProvider> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const formData = new FormData();
    formData.append("images", data?.images[0] || "");
    formData.append("store_reference", data?.store_reference || "");
    formData.append("post_title", data.post_title);
    formData.append("post_description", data.post_description);
    formData.append("post_reference", data.post_reference);
    formData.append("user_reference", data.user_reference);
    formData.append("author", data.author);

    const response = await axios.post(`${API_URL}/posts/update`, formData, { headers });
    return response.data as IResponseProvider;
};

// Create post
export const createPostData = async (data: ICreatePost): Promise<IResponseProvider> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const formData = new FormData();
    formData.append("images", data?.images[0] || "");
    formData.append("store_reference", data?.store_reference || "");
    formData.append("post_title", data.post_title);
    formData.append("post_description", data.post_description);
    formData.append("user_reference", data.user_reference);
    formData.append("author", data.author);

    const response = await axios.post(`${API_URL}/posts/create`, formData, {
        headers: { "Content-Type": "multipart/form-data", ...headers },
    });
    return response.data as IResponseProvider;
};
