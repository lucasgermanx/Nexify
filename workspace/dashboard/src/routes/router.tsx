import Page404 from "@/pages/404/page";
import { createBrowserRouter } from "react-router-dom";
import blogRouter from "./routes/blog.router";
import couponsRouter from "./routes/coupon.router";
import estoqueRouter from "./routes/estoque.router";
import homeRouter from "./routes/home.router";
import settingsRouter from "./routes/settings.router";
import transactionRouter from "./routes/transaction.router";

export const routes = createBrowserRouter([
    {
        path: "*",
        element: <Page404/>,
    },
    ...homeRouter,
    ...couponsRouter,
    ...settingsRouter,
    ...blogRouter,
    ...estoqueRouter,
    ...transactionRouter
]);