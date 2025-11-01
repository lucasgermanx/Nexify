import { Suspense } from "react";

import { CategoriesProvider } from "@/core/client/providers/categories.provider";
import { CouponProvider } from "@/core/client/providers/coupon.provider";
import { PaymentsProvider } from "@/core/client/providers/payment.provider";
import { ProductsProvider } from "@/core/client/providers/products.provider";
import CartPage from "@/pages/cart/page";
import CategoryPage from "@/pages/shop/category/page";
import ShopPage from "@/pages/shop/page";
import { ProgressBar } from "react-bootstrap";

const shopRouter = [
  {
    path: "/shop",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <CategoriesProvider>
          <ProductsProvider>
            <ShopPage />
          </ProductsProvider>
        </CategoriesProvider>
      </Suspense>
    ),
  },
  {
    path: "/shop/:categoryFilter",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <CategoriesProvider>
          <ProductsProvider>
            <CategoryPage />
          </ProductsProvider>
        </CategoriesProvider>
      </Suspense>
    ),
  },
  {
    path: "/cart",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <ProductsProvider>
          <CouponProvider>
            <PaymentsProvider>
              <CartPage />
            </PaymentsProvider>
          </CouponProvider>
        </ProductsProvider>
      </Suspense>
    ),
  },
];

export default shopRouter;
