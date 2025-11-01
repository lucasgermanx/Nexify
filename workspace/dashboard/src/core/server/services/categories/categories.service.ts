import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API_URL = import.meta.env.VITE_API_URL;

// Interfaces
interface IGetCategoriesData {
  store_reference: string;
  page: number;
  pageSize: number;
}

interface IFilterCouponData {
  store_reference: string;
  value: string;
  page: number;
  pageSize: number;
}

interface IDeleteCategory {
  category_reference: string;
  store_reference: string;
}

interface IUpdateCategory {
  store_reference:string;
  category_reference: string;
  category: string;
  category_icon: string;
  category_slug?: string;
}

interface ICreateCategory {
  category: string;
  category_icon: string;
  store_reference: string;
}

// Funções de API
export const getCategoriesData = async (data: IGetCategoriesData) => {
  const response = await axios.get(`${API_URL}/store/categories`, {
    params: {
      store_reference: data.store_reference,
      page: data.page,
      pageSize: data.pageSize,
    },
    headers: {
      authorization: `${cookies.get("fm_token")}`,
    },
  });

  return response.data;
};

export const filterCouponData = async (data: IFilterCouponData) => {
  const response = await axios.get(`${API_URL}/store/coupons/filter/${data.store_reference}/${data.value}`, {
    params: {
      page: data.page,
      size: data.pageSize,
    },
    headers: {
      authorization: `${cookies.get("fm_token")}`,
    },
  });

  return response.data;
};

export const deleteCategory = async (data: IDeleteCategory) => {
  const response = await axios.post(`${API_URL}/store/categories/delete`, {
    ...data,
  }, {
    headers: {
      authorization: `${cookies.get("fm_token")}`,
    },
  });

  return response.data;
};

export const updateCategoryData = async (data: IUpdateCategory) => {
  const response = await axios.put(`${API_URL}/store/categories/update`, {
    ...data,
  }, {
    headers: {
      authorization: `${cookies.get("fm_token")}`,
    },
  });

  return response.data;
};

export const createCategoryData = async (data: ICreateCategory) => {
  const response = await axios.post(`${API_URL}/store/categories/create`, {
    ...data,
  }, {
    headers: {
      authorization: `${cookies.get("fm_token")}`,
    },
  });

  return response.data;
};
