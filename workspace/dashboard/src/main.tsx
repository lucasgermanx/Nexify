import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./assets/Style/GlobalStyle";
import { AuthProvider } from "./core/client/providers/auth/auth.provider";
import { StoreProvider } from "./core/client/providers/store/store.provider";
import { ToastComponent } from "./global/components/toast.component";
import { routes } from "./routes/router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastComponent>
      <AuthProvider>
        <StoreProvider>
            <RouterProvider router={routes} />
        </StoreProvider>
      </AuthProvider>
    </ToastComponent>
  </React.StrictMode>
);
