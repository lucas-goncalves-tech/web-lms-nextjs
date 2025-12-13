import { Award, Lock, BookOpen, BookA, Users } from "lucide-react";

export const navItems = [
  {
    title: "Meus cursos",
    href: "/",
    icon: BookOpen,
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

export const adminNavItems = [
  {
    title: "Cursos",
    href: "/admin/courses",
    icon: BookA,
  },
  {
    title: "Usuários",
    href: "/admin/users",
    icon: Users,
  },
];
