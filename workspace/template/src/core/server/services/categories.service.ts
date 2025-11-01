import axiosConfig from '@/global/axios/axios.config';
import { ICategoriesResponse } from '../@types/categories.type';

class CategoriesServices {
    public async getCategoriesData(
        store_reference: string,
        page: string,
        pageSize: string
    ): Promise<ICategoriesResponse> {
        const response = await axiosConfig.get(`/store/categories`, {
            params: {
                store_reference: store_reference,
                page: page,
                pageSize: pageSize,
            },
        });

        return response.data;
    }

    public async filterCategoriesData(
        store_reference: string,
        value: string,
        page: string,
        pageSize: string
    ): Promise<ICategoriesResponse> {
        const response = await axiosConfig.get(`store/categories`, {
            params: {
                store_reference,
                filter: value,
                page,
                pageSize: pageSize,
            },
        });
        return response.data;
    }
}

export default new CategoriesServices();
