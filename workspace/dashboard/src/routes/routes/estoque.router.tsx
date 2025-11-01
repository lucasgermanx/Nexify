import { Suspense } from "react";

import { CategoriesProvider } from "@/core/client/providers/categories/categories.provider";
import { ProductsProvider } from "@/core/client/providers/products/products.provider";
import { VariablesProvider } from "@/core/client/providers/variables/variables.provider";
import { WrapperAdminLayout } from "@/global/components/wrapper-admin.component";
import ProductsPage from "@/pages/products/page";
import VariablesPage from "@/pages/variables/page";

const estoqueRouter = [
  {
    path: "/comandos",
    element: (
      <Suspense fallback={""}>
        <WrapperAdminLayout>
          <VariablesProvider>
            <VariablesPage />
          </VariablesProvider>
        </WrapperAdminLayout>
      </Suspense>
    ),
  },
  {
    path: "/produtos",
    element: (
      <Suspense fallback={""}>
        <WrapperAdminLayout>
          <CategoriesProvider>
            <VariablesProvider>
              <ProductsProvider>
                <ProductsPage />
              </ProductsProvider>
            </VariablesProvider>
          </CategoriesProvider>
        </WrapperAdminLayout>
      </Suspense>
    ),
  },
];

export default estoqueRouter;
