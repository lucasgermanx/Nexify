import { CategoriesContextType } from "@/core/server/@types/categories.type";
import { CategoryContext } from "../providers/categories.provider";
import React from "react";

export default function useCategories(){
    const context =  React.useContext(CategoryContext) as CategoriesContextType
    return context
}