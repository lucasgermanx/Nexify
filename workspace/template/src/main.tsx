import GlobalStyle from "./global/style/global-style";
import { HelmetSEO } from "./core/client/components/healmet-seo.component";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./core/client/providers/store.provider";
import { ToastComponent } from "./global/components/toast.component";
import { routes } from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastComponent>
      <StoreProvider>
        <HelmetSEO>
          <GlobalStyle />
          <RouterProvider router={routes} />
        </HelmetSEO>
      </StoreProvider>
    </ToastComponent>
  </React.StrictMode>
);
