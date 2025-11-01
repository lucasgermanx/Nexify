import { PropsProvider } from '@/core/@types/general.types';
import { useManageStore } from '@/core/client/hooks/select-store-zuustand';
import { useCategory } from '@/core/client/providers/categories/categories.provider';
import { createProductData, deleteProductData, updateProductData } from '@/core/server/services/products/products.service';
import React, { useContext } from 'react';
import { toast } from 'sonner';
import { ICreateProductData, IUpdateProductData, ProductsContextType } from './products-provider.types';

export const ProductsContext = React.createContext<ProductsContextType>(
  {} as ProductsContextType
);

export const ProductsProvider: React.FC<PropsProvider> = ({ children }) => {
  const {store_reference} = useManageStore()
  const {ProviderGetAllCategories} = useCategory()
  
  const ProviderCreateProduct = async (data: ICreateProductData) => {
    try {
        if(!store_reference)
          return

        const response = await createProductData({store_reference: store_reference, ...data})
        if(response == undefined || response.failed == true){
            return toast.error(response?.message || "Não foi possível criar seu produto. Tente novamente mais tarde!");
        }

        ProviderGetAllCategories('1')
        return toast.success(response.message);
    } catch (error) {
        return toast.error("Não foi possível criar seu produto! Tente novamente mais tarde");
    }
  }

  const ProviderDeleteProduct = async (product_reference:string) => {
    try {
        if(!store_reference)
          return

        const response = await deleteProductData({
          product_reference: product_reference,
          store_reference: store_reference
        })

        if(response == undefined || response.failed == true){
            return toast.error(response?.message || "Não foi possível deletar seu produto. Tente novamente mais tarde!");
        }

        ProviderGetAllCategories('1')
        return toast.success(response.message);
    } catch (error) {
        return toast.error("Não foi possível deletar seu produto! Tente novamente mais tarde");
    }
  }

  const ProviderProductUpdate = async (data: IUpdateProductData) => {
    try {
        if(!store_reference)
          return
        
        const response = await updateProductData({store_reference, ...data})
       
        if(response == undefined || response.failed == true){
            return toast.error(response?.message || "Não foi possível atualizar seu produto. Tente novamente mais tarde!");
        }

        ProviderGetAllCategories('1')
        return toast.success(response.message);
    } catch (error) {
        return toast.error("Não foi possível atualizar seu produto! Tente novamente mais tarde");
    }
  }
  return (
    <ProductsContext.Provider value={{ ProviderCreateProduct, ProviderDeleteProduct, ProviderProductUpdate}}>
      {children}
    </ProductsContext.Provider>
  );
};



export const useProducts = () => useContext(ProductsContext);