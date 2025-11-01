/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from "react";

import useCategories from "@/core/client/hooks/categories.hook";
import useProducts from "@/core/client/hooks/products.hook";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const categoryActions = () => {
  const { categoryFilter } = useParams();
  const { register, watch } = useForm();
  const {ProviderGetProduct, filterProducts} = useProducts()
  const {categories, category, products, ProviderGetCategory, paginationFilter} = useCategories()
  const [isFiltering, setFiltering] = useState(false);

  const handlePageChange = (pageNumber: string) => {
    if (!isFiltering) {
      ProviderGetProduct(pageNumber, categoryFilter || '');
    } else {
      ProviderGetCategory('1', categoryFilter || '');
    }
  };

  useEffect(() => {
    if (watch("value")?.length != 0) {
      setFiltering(true);
      ProviderGetProduct('1', watch("value"));
    } else {
      setFiltering(false);
      ProviderGetCategory('1', categoryFilter || '');
    }
  }, [watch("value")]);

  useEffect(()=>{
    ProviderGetCategory('1', categoryFilter || '')
  }, [categoryFilter])


  return { categories, category, products, ProviderGetCategory, paginationFilter, handlePageChange, register, filterProducts , isFiltering};
};
