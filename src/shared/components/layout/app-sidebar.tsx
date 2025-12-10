"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Search,
  Award,
  LogOut,
  Lock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "../ui/button";
import { useLogout } from "@/features/auth";
import { useAuth } from "@/shared/context/auth";
import { SidebarSkeleton } from "./sidebar-loading";

export const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Meus Cursos",
    href: "/courses",
    icon: BookOpen,
  },
  {
    title: "Catálogo de Cursos",
    href: "/catalog",
    icon: Search,
  },
  {
    title: "Meus Certificados",
    href: "/certificates",
    icon: Award,
  },
  {
    title: "Segurança",
    href: "/secure",
    icon: Lock,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { mutate: logout } = useLogout();

  if (!user) return <SidebarSkeleton />;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>HS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sair">
              <Button className="w-full justify-start" onClick={() => logout()}>
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
