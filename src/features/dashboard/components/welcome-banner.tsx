"use client";

import { useAuth } from "@/shared/context/auth";

export function WelcomeBanner() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-4xl font-black tracking-tight text-foreground">
        Meu Dashboard
      </h1>
      <p className="text-base text-muted-foreground">
        Bem-vinda de volta,{" "}
        <span className="font-bold capitalize">{user?.name}</span>!
      </p>
    </div>
  );
}
