import { Suspense } from "react";

import { CouponProvider } from "@/core/client/providers/coupons/coupons.provider.tsx";
import { WrapperAdminLayout } from "@/global/components/wrapper-admin.component.tsx";
import CouponsPage from "../../pages/coupons/page.tsx";

const couponsRouter = [
  {
    path: "/cupons",
    element: (
      <Suspense fallback={""}>
        <WrapperAdminLayout>
          <CouponProvider>
            <CouponsPage />
          </CouponProvider>
        </WrapperAdminLayout>
      </Suspense>
    ),
  },
];

export default couponsRouter;
