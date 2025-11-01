import React, { useContext, useState } from 'react';

import { IPagination } from '@/@types/general.type';
import { useManageStore } from '@/core/client/hooks/select-store-zuustand';
import { createCategoryData, deleteCategory, getCategoriesData, updateCategoryData } from '@/core/server/services/categories/categories.service';
import { toast } from 'sonner';
import { CategoriesContextType, ICategoriesResponse, ICategory, ICategoryCreate, ICategoryUpdate } from './category-provider.types';

export const CategoryContext = React.createContext<CategoriesContextType>(
  {} as CategoriesContextType
);

export const CategoriesProvider = (props: any) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [paginationFilter, setPaginationFilter] = useState<IPagination>()
  const { store_reference } = useManageStore()

  const ProviderGetAllCategories = async (page: string) => {
    try {
      if (!store_reference) return
      
      const response = await getCategoriesData({
        store_reference: store_reference,
        page: page ? parseInt(page) : 1,
        pageSize: 12
      }) as ICategoriesResponse

      if (response == undefined || response.failed == true) {
        return toast.error("Não foi possível filtrar as categorias no momento. Tente novamente mais tarde!");
      }

      setCategories(response.categories)
      setPaginationFilter({
        paginationCount: response.paginationCount,
        hasMoreResults: response.hasMoreResults
      })
    } catch (error) {
      console.log(error)
    }
  }

  const ProviderCreateCategory = async (category: ICategoryCreate) => {
    try {
      if (!store_reference)
        return
     
      const response = await createCategoryData({
        category: category.category,
        category_icon: category.category_icon,
        store_reference: store_reference
      })
     
      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível criar sua categoria. Tente novamente mais tarde!");
      }

      ProviderGetAllCategories("1")
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível criar sua categoria! Tente novamente mais tarde");
    }
  }

  const ProviderUpdateCategory = async (category: ICategoryUpdate) => {
    try {
      if (!store_reference)
        return
      
      const response = await updateCategoryData({
        store_reference,
        category_reference: category.category_reference,
        category: category.category,
        category_icon: category.category_icon,
        category_slug: category.category_slug
      })
      
      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível atualizar sua categoria. Tente novamente mais tarde!");
      }

      ProviderGetAllCategories("1")
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível atualizar sua categoria! Tente novamente mais tarde");
    }
  }

  const ProviderDeleteCategory = async (category_reference: string) => {
    try {
      if (!store_reference)
        return

      const response = await deleteCategory({ category_reference, store_reference: store_reference })
    
      if (response == undefined || response.failed == true) {
        return toast.error(response?.message || "Não foi possível deletar sua categoria. Tente novamente mais tarde!");
      }

      ProviderGetAllCategories("1")
      return toast.success(response.message);
    } catch (error) {
      return toast.error("Não foi possível deletar sua categoria! Tente novamente mais tarde");
    }
  }

  React.useEffect(() => {
    ProviderGetAllCategories('1')
  }, [store_reference])

  return (
    <CategoryContext.Provider value={{ ProviderGetAllCategories, ProviderUpdateCategory, ProviderCreateCategory, ProviderDeleteCategory, categories, paginationFilter }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);