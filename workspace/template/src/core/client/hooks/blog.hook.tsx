import { BlogContext } from "../providers/blog.provider";
import { BlogContextType } from "@/core/server/@types/blog.type";
import React from "react";

export default function useBlog(){
    const context =  React.useContext(BlogContext) as BlogContextType
    return context
}