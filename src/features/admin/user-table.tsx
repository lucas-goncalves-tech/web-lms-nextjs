"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { TableSkeleton } from "./table-skeleton";
import { MobileCardSkeleton } from "./mobile-card-skeleton";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { UserActionsDropdown } from "./user-actions-dropdown";
import { useGetUsersTable } from "./hooks/use-get-users-table";

export type UserForm = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: number;
};

export function UserTable() {
  const { data: users, isLoading, isError } = useGetUsersTable();

  if (isLoading) {
    return (
      <>
        <MobileCardSkeleton />
        <TableSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Erro ao carregar usuários</div>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Nenhum usuário encontrado</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {/* TODO: Substituir por UserFormDialog */}
        <Button>Novo Usuário</Button>
      </div>

      {/* Mobile View - Cards */}
      <div className="block md:hidden space-y-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {user.name}
                  </h3>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {user.email}
                </p>
                <Badge
                  variant={user.isActive ? "outline" : "destructive"}
                  className="mt-2"
                >
                  {user.isActive ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <UserActionsDropdown user={user} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead className="w-[100px]">Role</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[80px] text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground line-clamp-2">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "ADMIN" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "outline" : "destructive"}>
                    {user.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <UserActionsDropdown user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
