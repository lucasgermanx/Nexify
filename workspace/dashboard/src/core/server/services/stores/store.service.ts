import { IResponseProvider } from "@/@types/general.type";
import { StoreResponse } from "@/core/client/providers/store/store-provider.types";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => ({ authorization: `${cookies.get("fm_token")}` });

export const getStoreData = async (id: string): Promise<StoreResponse> => {
    const response = await axios.get(`${API_URL}/store/${id}`, { headers: getAuthHeaders() });
    return response.data as StoreResponse;
};

// Update store
export const updateStore = async (store_reference: string, data: any): Promise<IResponseProvider> => {
    const { store_domain, ...newData } = data;
    const response = await axios.put(
        `${API_URL}/store/update`,
        { store_reference, ...(store_domain ? { store_domain } : {}), ...newData, maintenance: newData.maintenance == "true" },
        { headers: getAuthHeaders() }
    );
    return response.data;
};

// Update payment data
export const updateDataPayments = async (store_reference: string, type: string, tokens: any): Promise<IResponseProvider> => {
    const endpoint = type === "mercadopago" ? "/store/payment/mercadopago/update" : "/store/payment/picpay/update";
    const payload = type === "mercadopago" ? { store_reference, token: tokens?.token } : { store_reference, ...tokens };
    const response = await axios.post(`${API_URL}${endpoint}`, payload, { headers: getAuthHeaders() });
    return response.data;
};

// Cancel store
export const cancelStore = async (store_reference: string): Promise<IResponseProvider> => {
    const response = await axios.post(`${API_URL}/store/cancel`, { store_reference }, { headers: getAuthHeaders() });
    return response.data;
};

// Update subscription plan
export const updateSubscriptionPlan = async (store_reference: string, plan: string): Promise<IResponseProvider> => {
    const response = await axios.post(`${API_URL}/store/update/plan`, { store_reference, store_plan: plan }, { headers: getAuthHeaders() });
    return response.data;
};

export const getSubscriptionUser = async (store_reference: string) => {
    const response = await axios.get(`${API_URL}/store/subscription/user/${store_reference}`, { headers: getAuthHeaders() });
    return response.data;
};
