import { Suspense } from "react";

import { BlogProvider } from "@/core/client/providers/blog.provider";
import { ProductsProvider } from "@/core/client/providers/products.provider";
import { StoreProvider } from "@/core/client/providers/store.provider";
import NotFoundStore from "@/pages/404/page";
import HomePage from "@/pages/home/home.page";
import { ProgressBar } from "react-bootstrap";

const homeRouter = [
  {
    path: "/",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <BlogProvider>
          <ProductsProvider>
            <HomePage />
          </ProductsProvider>
        </BlogProvider>
      </Suspense>
    ),
  },
  {
    path: "/store-not-found",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <StoreProvider>
          <NotFoundStore />
        </StoreProvider>
      </Suspense>
    ),
  },
];

export default homeRouter;
