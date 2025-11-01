import blogRouter from "./Routes/blog.router";
import { createBrowserRouter } from "react-router-dom";
import homeRouter from "./Routes/home.router";
import productRouter from "./Routes/product.router";
import shopRouter from "./Routes/shop.router";

export const routes = createBrowserRouter([
    ...homeRouter,
    ...shopRouter,
    ...productRouter,
    ...blogRouter
]);