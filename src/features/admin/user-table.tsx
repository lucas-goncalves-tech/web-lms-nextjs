"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { UserActionsDropdown } from "./user-actions-dropdown";
import { useGetUsersTable } from "./hooks/use-get-users-table";
import { UserCreateFormDialog } from "./user-create-form-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { SearchIcon } from "lucide-react";

export type UserForm = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: number;
};

const LIMIT = 10;
const DEBOUNCE_MS = 400;

export function UserTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read from URL
  const urlSearch = searchParams.get("search") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  // Local state for input (prevents cursor jump)
  const [inputValue, setInputValue] = useState(urlSearch);

  // Sync input when URL changes externally (e.g., browser back)
  useEffect(() => {
    setInputValue(urlSearch);
  }, [urlSearch]);

  // Debounced URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== urlSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (inputValue) {
          params.set("search", inputValue);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [inputValue, urlSearch, pathname, router, searchParams]);

  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsersTable({
    search: urlSearch,
    page,
    limit: LIMIT,
  });

  const goToPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  const handlePrevious = () => {
    if (page > 1) goToPage(page - 1);
  };

  const handleNext = () => {
    if (users && users.length === LIMIT) {
      goToPage(page + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header: Search + Create Button + Pagination - ALWAYS VISIBLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-sm">
            <Input
              id="search-users"
              type="text"
              icon={SearchIcon}
              placeholder="Nome ou email..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <UserCreateFormDialog />
        </div>
        <div className="flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  className={
                    !users || users.length < LIMIT
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Loading state - only for table content */}
      {isLoading && (
        <>
          <MobileCardSkeleton />
          <TableSkeleton />
        </>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">Erro ao carregar usuários</div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && (!users || users.length === 0) && (
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Nenhum usuário encontrado</div>
        </div>
      )}

      {/* Mobile View - Cards */}
      {!isLoading && users && users.length > 0 && (
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
      )}

      {/* Desktop View - Table */}
      {!isLoading && users && users.length > 0 && (
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
      )}
    </div>
  );
}
