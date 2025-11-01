import { Suspense } from "react";

import { CategoriesProvider } from "@/core/client/providers/categories.provider";
import { ProductsProvider } from "@/core/client/providers/products.provider";
import { ProductPage } from "@/pages/product/page";
import { ProgressBar } from "react-bootstrap";

const productRouter = [
  {
    path: "/product/:product_reference",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <CategoriesProvider>
          <ProductsProvider>
            <ProductPage />
          </ProductsProvider>
        </CategoriesProvider>
      </Suspense>
    ),
  },
];

export default productRouter;
