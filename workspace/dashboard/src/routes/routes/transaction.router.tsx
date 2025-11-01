import { WrapperAdminLayout } from "@/global/components/wrapper-admin.component";
import TransactionPage from "@/pages/transactions/page";
import { TransactionProvider } from "@/pages/transactions/provider";
import { Suspense } from "react";

const transactionRouter = [
  {
    path: "/transacoes",
    element: (
      <Suspense fallback={""}>
        <WrapperAdminLayout>
          <TransactionProvider>
            <TransactionPage />
          </TransactionProvider>
        </WrapperAdminLayout>
      </Suspense>
    ),
  },
];

export default transactionRouter;
