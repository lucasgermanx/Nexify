import "@/styles/globals.css";

import { AuthProvider } from "@/core/client/providers/auth.provider";
import { Metadata } from "next";
import { Providers } from "./providers";
import { StoreProvider } from "@/core/client/providers/store.provider";
import { ToastComponent } from "@/components/toast.component";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import favicon from "@/public/favicon.ico"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: favicon.src,
    shortcut: favicon.src,
    apple: favicon.src,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "white" }}>
          <div className="relative flex-col h-screen">
            <AuthProvider>
              <StoreProvider>
                <ToastComponent>
                  <main>{children}</main>
                </ToastComponent>
              </StoreProvider>
            </AuthProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
