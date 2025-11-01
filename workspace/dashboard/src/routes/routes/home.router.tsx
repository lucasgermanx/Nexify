import { Suspense, lazy } from "react";

import { AuthProvider } from "@/core/client/providers/auth/auth.provider";
import { StoreProvider } from "@/core/client/providers/store/store.provider";
import LoadingPageComponent from "@/global/components/loading-page.component";
import { WrapperAdminLayout } from "@/global/components/wrapper-admin.component";
import { TransactionProvider } from "@/pages/transactions/provider";

const HomePage = lazy(() => import("@/pages/home/page.tsx"));

const HomeRouter = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPageComponent />}>
        <AuthProvider>
          <WrapperAdminLayout>
            <StoreProvider>
              <TransactionProvider>
                <HomePage />
              </TransactionProvider>
            </StoreProvider>
          </WrapperAdminLayout>
        </AuthProvider>
      </Suspense>
    ),
  },
];

export default HomeRouter;
