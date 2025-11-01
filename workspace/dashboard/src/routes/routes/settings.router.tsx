import { UserProvider } from "@/core/client/providers/user/user.provider";
import { SettingsPage } from "@/pages/settings/page";
import { ContentProvider } from "@/pages/settings/template/provider";
import { Suspense } from "react";

const settingsRouter = [
  {
    path: "/settings/",
    element: (
      <Suspense fallback={""}>
        <UserProvider>
            <ContentProvider>
              <SettingsPage />
            </ContentProvider>
        </UserProvider>
      </Suspense>
    ),
  }
];

export default settingsRouter;
