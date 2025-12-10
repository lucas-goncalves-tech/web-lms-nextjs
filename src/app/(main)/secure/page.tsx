import { UpdatePasswordForm } from "@/features/auth";

export default function SecurePage() {
  return (
    <div className="space-y-8 max-w-2xl w-full">
      {/* Page Heading */}
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Segurança
        </h1>
        <p className="text-base text-muted-foreground">
          Gerencie a segurança da sua conta
        </p>
      </div>

      {/* Update Password Form */}
      <UpdatePasswordForm />
    </div>
  );
}
