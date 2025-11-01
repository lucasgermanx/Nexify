import { ICreateCoupon, IUpdateCoupon } from "@/core/client/providers/coupons/coupons-provider.type";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface IGetAllCoupons {
    store_reference: string;
    page: number;
    pageSize: number;
}

interface IFilterCoupons {
    store_reference: string;
    page: number;
    pageSize: number;
    value: string;
}

interface IUpdateStatusCoupon {
    activated: boolean,
    coupon_reference: string,
    store_reference: string
}

const API_URL = import.meta.env.VITE_API_URL

export const getAllCoupons = async (dataPayload: IGetAllCoupons) => {
    const response = await axios.get(API_URL + `/store/coupons/${dataPayload.store_reference}/?page=${dataPayload.page}&size=${dataPayload.pageSize}`, {
        headers: {
            authorization: `${cookies.get("fm_token")}`,
        }
    })
    return response.data
}

export const filterCoupons = async (dataPayload: IFilterCoupons) => {
    const response = await axios.get(API_URL + `/store/coupons/filter/${dataPayload.store_reference}/${dataPayload.value}/?page=${dataPayload.page}&size=${dataPayload.pageSize}`, {
        headers: {
            authorization: `${cookies.get("fm_token")}`,
        }
    })
    return response.data
}

export const deleteCoupon = async (coupon_reference: string) => {
    const response = await axios.post(API_URL + '/store/coupons/delete', {
        coupon_reference
    }, {
        headers: {
            authorization: `${cookies.get("fm_token")}`,
        },
    });

    return response.data
}

export const updateStatusCoupon = async (dataPayload: IUpdateStatusCoupon) => {
    const response = await axios.post(API_URL +'/store/coupons/update', {
        ...dataPayload
    }, {
        headers: {
            authorization: `${cookies.get("fm_token")}`,
        },
    });

    return response.data
}

export const updateCoupon = async (dataPayload: IUpdateCoupon) => {
    const response = await axios.post(API_URL + '/store/coupons/update', {
        ...dataPayload
    }, {
        headers: {
            authorization: `${cookies.get("fm_token")}`,
        },
    });

    return response.data;
}

export const createCoupon = async (dataPayload: ICreateCoupon) => {
    const response = await axios.post(API_URL + '/store/coupons/create', {
        ...dataPayload
    }, {
        headers: {
            authorization: `${cookies.get("fm_token")}`,
        },
    });

    return response.data;
}