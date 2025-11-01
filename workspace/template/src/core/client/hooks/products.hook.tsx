import { ProductContext } from "../providers/products.provider";
import { ProductContextType } from "@/core/server/@types/products.type";
import React from "react";

export default function useProducts(){
    const context =  React.useContext(ProductContext) as ProductContextType
    return context
}