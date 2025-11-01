import { BlogProvider } from "@/core/client/providers/blog/blog.provider";
import { WrapperAdminLayout } from "@/global/components/wrapper-admin.component";
import BlogPage from "@/pages/blog/page.tsx";
import { Suspense } from "react";

const blogRouter = [
  {
    path: "/blog",
    element: (
      <Suspense fallback={""}>
        <WrapperAdminLayout>
          <BlogProvider>
            <BlogPage />
          </BlogProvider>
        </WrapperAdminLayout>
      </Suspense>
    ),
  },
];

export default blogRouter;
