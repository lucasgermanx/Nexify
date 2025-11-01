import { IResponseProvider } from "@/core/@types/general.types";
import { userUpdate, userUpdatePassword } from "@/core/client/providers/user/user-provider.types";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get authentication headers
const getAuthHeaders = () => {
    const token = cookies.get("fm_token");
    return token ? { authorization: token } : undefined;
};

// Update user data
export const updateUser = async (userData: userUpdate): Promise<IResponseProvider> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/user/update`, userData, { headers });
    return response.data as IResponseProvider;
};

// Update user password
export const updateUserPassword = async (userData: userUpdatePassword): Promise<IResponseProvider> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/user/update/password`, userData, { headers });
    return response.data as IResponseProvider;
};
