import React from "react";
import { ContentContextType } from "./@types";
import { ContentContext } from "./provider";

export default function useContent() {
    const context = React.useContext(ContentContext) as ContentContextType
    return context
}