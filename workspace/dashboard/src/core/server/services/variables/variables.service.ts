import { IVariableCreate, IVariableResponse, IVariableUpdate } from "@/core/client/providers/variables/variables-provider.types";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get authentication headers
const getAuthHeaders = () => {
    const token = cookies.get("fm_token");
    return token ? { authorization: token } : undefined;
};

// Get variable data
export const getVariableData = async (store_reference: string, page: string, pageSize: string): Promise<IVariableResponse> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.get(`${API_URL}/store/variables/${store_reference}/?page=${page}&size=${pageSize}`, { headers });
    return response.data as IVariableResponse;
};

// Filter variables
export const filterDataVariable = async (store_reference: string, value: string, page: string, pageSize: string): Promise<IVariableResponse> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.get(`${API_URL}/store/variables/${store_reference}/?page=${page}&size=${pageSize}&filter=${value}`, { headers });
    return response.data as IVariableResponse;
};

// Delete variable
export const deleteVariableData = async (variable_reference: string, store_reference: string): Promise<IVariableResponse> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/store/variables/delete`, { variable_reference, store_reference }, { headers });
    return response.data as IVariableResponse;
};

// Update variable
export const updateVariableData = async (variable: IVariableUpdate): Promise<IVariableResponse> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/store/variables/update`, { ...variable }, { headers });
    return response.data as IVariableResponse;
};

// Create variable
export const createVariableData = async (data: IVariableCreate): Promise<IVariableResponse> => {
    const headers = getAuthHeaders();
    if (!headers) throw new Error("Authorization token not found");

    const response = await axios.post(`${API_URL}/store/variables/create`, { ...data }, { headers });
    return response.data as IVariableResponse;
};
