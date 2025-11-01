import { Suspense } from "react";

import { BlogProvider } from "@/core/client/providers/blog.provider";
import { Blog } from "@/pages/blog/page";
import { Post } from "@/pages/blog/post/page";
import { ProgressBar } from "react-bootstrap";

const blogRouter = [
  {
    path: "/blog",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <BlogProvider>
          <Blog />
        </BlogProvider>
      </Suspense>
    ),
  },
  {
    path: "/post/:post_reference",
    element: (
      <Suspense fallback={<ProgressBar></ProgressBar>}>
        <BlogProvider>
          <Post />
        </BlogProvider>
      </Suspense>
    ),
  },
];

export default blogRouter;
