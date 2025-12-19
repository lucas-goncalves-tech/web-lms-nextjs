import { UpdatePasswordForm } from "@/features/profile/components/update-password-form";
import { PageHeader } from "@/shared/components/ui/page-header";

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-2xl w-full">
      <PageHeader title="Perfil" subtitle="Gerencie seu perfil" />

      {/* Update Password Form */}
      <UpdatePasswordForm />
    </div>
  );
}
