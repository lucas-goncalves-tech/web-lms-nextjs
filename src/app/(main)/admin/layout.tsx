"use client";

import { useAuth } from "@/shared/context/auth";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
