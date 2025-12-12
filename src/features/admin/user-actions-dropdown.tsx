"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Pencil, Power } from "lucide-react";
import { useState } from "react";
import { UserForm } from "./user-table";
import { useToggleStatus } from "./hooks/use-toggle-status";

type Props = {
  user: UserForm;
};

export function UserActionsDropdown({ user }: Props) {
  const { mutateAsync: toggleStatus } = useToggleStatus();
  const [open, setOpen] = useState(false);

  // TODO: Implementar handlers reais
  const handleEdit = () => {
    console.log("Edit user:", user.id);
    setOpen(false);
  };

  const handleToggleStatus = async () => {
    await toggleStatus(user.id);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleStatus}>
          <Power className="size-4" />
          {user.isActive ? "Desativar" : "Ativar"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
