"use client";

import { useCurrentUser } from "@/features/auth";
import { useAuth } from "@/context/auth";
import { usePathname } from "next/navigation";
import { publicRoutes } from "@/constants/public-routes";
import { PropsWithChildren } from "react";

export function AuthInitializer({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { isLoading } = useAuth();

  const isPublicRoute = publicRoutes.includes(pathname);
  useCurrentUser(!isPublicRoute);

  if (isLoading && !isPublicRoute) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}
