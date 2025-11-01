import React from "react";
import { StoreContext } from "../providers/store.provider";
import { StoreContextType } from "@/core/server/@types/store.type";

export default function useStore(){
    const context =  React.useContext(StoreContext) as StoreContextType
    return context
}