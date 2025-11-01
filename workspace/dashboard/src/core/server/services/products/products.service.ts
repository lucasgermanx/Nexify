import { IResponseProvider } from "@/@types/general.type";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

interface ICreateProductData {
    images: File[];
    store_reference: string;
    product_name: string;
    category_reference: string;
    product_price: string;
    product_price_discount: string;
    expire_day: string;
    product_visibility: string;
    product_stock: string;
    product_description: string;
    variables: string[];
}

interface IDeleteProductData {
    product_reference: string;
    store_reference: string;
}

interface IUpdateProductData extends ICreateProductData {
    product_reference: string;
}

// Helper function to get authentication headers
const getAuthHeaders = () => ({
    authorization: `${cookies.get("fm_token")}`,
});

// Function to create FormData from product data
const createProductFormData = (data: ICreateProductData | IUpdateProductData) => {
    const formData = new FormData();
    formData.append("images", data?.images[0] || "");
    formData.append("store_reference", data?.store_reference || "");
    formData.append("product_name", data.product_name);
    formData.append("category_reference", data.category_reference);
    formData.append("product_price", data.product_price);
    formData.append("product_price_discount", data.product_price_discount);
    formData.append("expire_day", data.expire_day);
    formData.append("product_visibility", data.product_visibility);
    formData.append("product_stock", data.product_stock);
    formData.append("product_description", data.product_description);
    formData.append("variables", data.variables.join(","));
    if ("product_reference" in data) {
        formData.append("product_reference", data.product_reference);
    }
    return formData;
};

// Create product
export const createProductData = async (data: ICreateProductData): Promise<IResponseProvider> => {
    const formData = createProductFormData(data);
    const response = await axios.post(`${API_URL}/store/products/create`, formData, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Delete product
export const deleteProductData = async (data: IDeleteProductData): Promise<IResponseProvider> => {
    const response = await axios.post(`${API_URL}/store/products/delete`, data, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// Update product
export const updateProductData = async (data: IUpdateProductData): Promise<IResponseProvider> => {
    const formData = createProductFormData(data);
    const response = await axios.post(`${API_URL}/store/products/update`, formData, {
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
