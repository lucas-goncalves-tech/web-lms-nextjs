import { UserTable } from "@/features/admin/user-table";
import { PageHeader } from "@/shared/components/ui/page-header";

export default function UsersPage() {
  return (
    <div className="w-full max-w-7xl">
      <PageHeader title="Usuários" subtitle="Administração de usuários" />
      <UserTable />
    </div>
  );
}
