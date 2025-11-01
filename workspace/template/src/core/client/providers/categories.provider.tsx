import { CategoriesContextType, ICategories } from "@/core/server/@types/categories.type";
import React, { useState } from "react";

import { IPagination } from "@/core/server/@types/general.type";
import { IProducts } from "@/core/server/@types/products.type";
import categoriesService from "@/core/server/services/categories.service";
import { toast } from "sonner";
import storeReference from "../utils/set-store-reference.utils";

export const CategoryContext = React.createContext<CategoriesContextType | null>(null);

export const CategoriesProvider = (props: any) => {
    const [categories, setCategories] = useState<ICategories[] | []>()
    const [category, setCategory] = useState<ICategories | undefined>()
    const [products, setProducts] = useState<IProducts[] | []>()
    const [paginationFilter, setPaginationFilter] = useState<IPagination>()
    const {store_reference} = storeReference()
    
    const ProviderGetAllCategories= async (page: string) => {
        try {
            if(!store_reference)
                return
            
            const response = await categoriesService.getCategoriesData(store_reference, page ? page : '1', '200')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível listar os produtos! Tente novamente mais tarde!");
            }

            setCategories(response.categories)
            setPaginationFilter({
              paginationCount: response.paginationCount,
              hasMoreResults: response.hasMoreResults
            })
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    const ProviderGetCategory = async (page: string, filter:string) => {
        try {
            if(!store_reference)
                return
            
            const response = await categoriesService.filterCategoriesData(store_reference, filter, page ? page : '1', '200')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível listar os produtos! Tente novamente mais tarde!");
            }
            
            setProducts(response.categories?.[0]?.products)
            setCategory(response?.categories[0])
            setPaginationFilter({
              paginationCount: response.paginationCount,
              hasMoreResults: response.hasMoreResults
            })
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    React.useEffect(()=>{
        ProviderGetAllCategories('1')
    }, [store_reference])

    return (
        <CategoryContext.Provider value={{categories, category, products, paginationFilter, ProviderGetAllCategories, ProviderGetCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
