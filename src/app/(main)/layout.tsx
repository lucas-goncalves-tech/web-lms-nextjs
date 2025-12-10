import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar";
import { AppSidebar, AppHeader } from "@/shared/components/layout";
import { PropsWithChildren } from "react";
import { AuthInitializer } from "@/shared/components/providers/auth-initializer";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AuthInitializer>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </SidebarInset>
      </AuthInitializer>
    </SidebarProvider>
  );
}
