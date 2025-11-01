import { IResponseProvider } from "@/core/@types/general.types";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get authentication headers
const getAuthHeaders = () => {
    const token = cookies.get("fm_token");
    return token ? { authorization: token } : undefined;
};

// Update file data
export const updateFileData = async (store_reference: string, type: string, file: File): Promise<IResponseProvider> => {
    const formData = new FormData();
    formData.append('images', file);
    formData.append('store_reference', store_reference);
    formData.append('type', type);

    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/store/content/update/file`, formData, { headers });
    return response.data as IResponseProvider;
};

// Update content data
export const updateData = async (data: any): Promise<IResponseProvider> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/store/content/update`, data, { headers });
    return response.data as IResponseProvider;
};
