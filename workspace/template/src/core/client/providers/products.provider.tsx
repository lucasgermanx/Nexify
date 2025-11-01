/* eslint-disable */

import { IProducts, IVariables, ProductContextType } from "@/core/server/@types/products.type";
import React, { useState } from "react";

import { IPagination } from "@/core/server/@types/general.type";
import productsController from "@/core/server/controllers/products.controller";
import { toast } from "sonner";
import storeReference from "../utils/set-store-reference.utils";

export const ProductContext = React.createContext<ProductContextType | null>(null);

export const ProductsProvider = (props: any) => {
    const [products, setProducts] = useState<IProducts[] | []>()
    const [filterProducts, setFilterProducts] = useState<IProducts[] | []>()
    const [productsWithOffer, setProductsWithOffer] = useState<IProducts[] | []>()
    const [paginationFilter, setPaginationFilter] = useState<IPagination>()
    const [variables, setVariables] = useState<IVariables[] | []>()
    const {store_reference} = storeReference()
    
    const ProviderGetAllProducts = async (page: string) => {
        try {
            if(!store_reference)
                return

            const response = await productsController.getProducts(store_reference, page ? page : '1', '4')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível listar os produtos! Tente novamente mais tarde!");
            }

            setProducts(response.products)
            setPaginationFilter({
              paginationCount: response.paginationCount,
              hasMoreResults: response.hasMoreResults
            })

            const productsWithDiscount = response.products?.filter(product => parseFloat(product.product_price_discount) != 0);
            const sortedProducts = productsWithDiscount?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            const recentProducts = sortedProducts?.slice(0, 6);
            setProductsWithOffer(recentProducts)
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    const ProviderGetProduct = async (page: string, filter:string) => {
        try {
            if(!store_reference)
                return
            
            const response = await productsController.filterProducts(store_reference, filter, page ? page : '1', '4')
            
            if(response == undefined || response.failed == true){
                return toast.error(response?.message || "Não foi possível listar os produtos! Tente novamente mais tarde!");
            }

            setFilterProducts(response.products)
            setPaginationFilter({
              paginationCount: response.paginationCount,
              hasMoreResults: response.hasMoreResults
            })

            const productsWithDiscount = response.products.filter(product => parseFloat(product.product_price_discount) != 0);
            const sortedProducts = productsWithDiscount.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            const recentProducts = sortedProducts.slice(0, 6);
            setProductsWithOffer(recentProducts)
        } catch (error) {
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    const ProviderGetVariableByProduct = async (filter:string) => {
        try {
            if(!filter || !store_reference){
                return
            }
            const response = await productsController.filterVariables(store_reference, filter)
            setVariables(response?.variables)
        } catch (error) {
            console.log(error)
            return toast.error("Não foi possível prosseguir com essa operação! Tente novamente mais tarde");
        }
    }

    React.useEffect(()=>{
        ProviderGetAllProducts('1')
    }, [store_reference])

    return (
        <ProductContext.Provider value={{products, filterProducts, productsWithOffer, paginationFilter, ProviderGetAllProducts, ProviderGetProduct, ProviderGetVariableByProduct, variables}}>
            {props.children}
        </ProductContext.Provider>
    );
};
