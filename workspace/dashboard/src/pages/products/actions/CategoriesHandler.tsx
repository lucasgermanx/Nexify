import { useCategory } from "@/core/client/providers/categories/categories.provider";
import { useState } from "react";

import React from "react";
import { useForm } from "react-hook-form";

// Manipulador para buscar categorias
export const CategoriesHandler = () => {
    const { register, watch } = useForm();
    const { categories, paginationFilter, ProviderGetAllCategories} = useCategory();
    const [isFiltering, setFiltering] = useState(false);
  
    const handlePageChange = (pageNumber: string) => {
        ProviderGetAllCategories(pageNumber);
      if (!isFiltering) {
        ProviderGetAllCategories(pageNumber);
      } else {
        // ProviderFilterCupons(watch("value"), pageNumber);
      }
    };
  
    React.useEffect(() => {
      if (watch("value")?.length != 0) {
        setFiltering(true);
        // ProviderFilterCupons(watch("value"), '1');
      } else {
        setFiltering(false);
        ProviderGetAllCategories('1');
      }
    }, [ProviderGetAllCategories, watch]);
  
    return { categories, paginationFilter, register, handlePageChange };
};

// Manipulador para o modal de criação de categorias
export const CategoriesHandlerModalCreate = () => {
    const [showModalCreateCategories, setShowModalCreateCategories] = useState(false);

    const handleCloseModalCreateCategories = () => setShowModalCreateCategories(false);
    const handleShowModalCreateCategories = () => setShowModalCreateCategories(true);

    return { showModalCreateCategories, handleCloseModalCreateCategories, handleShowModalCreateCategories };
};

export const CategoriesCreateHandler = () => {
    const {ProviderCreateCategory} = useCategory()
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        ProviderCreateCategory({
          category: data?.category.trim(),
          category_icon: data?.category_icon.trim()
        })
        reset()
    };

    return { register, handleSubmit, onSubmit };
};

// Manipulador para o modal de atualização de categorias
export const CategoriesModalUpdateHandler = () => {
    const [showModalUpdateCategories, setShowModalUpdateCategories] = useState(false);

    const handleCloseModalUpdateCategories = () => setShowModalUpdateCategories(false);
    const handleShowModalUpdateCategories = () => setShowModalUpdateCategories(true);

    return { showModalUpdateCategories, handleCloseModalUpdateCategories, handleShowModalUpdateCategories };
};

// Manipulador para atualizar categorias
export const CategoriesUpdateHandler = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { ProviderUpdateCategory } = useCategory();

    const onSubmit = (data: any) => {
        ProviderUpdateCategory(data)
    };

    return { register, handleSubmit, onSubmit, setValue };
};
