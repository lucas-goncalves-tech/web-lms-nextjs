import { LoginForm } from "@/features/auth";
import { GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>
      {/* Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="bg-primary/20 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <GraduationCap size={36} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Bem-vindo de volta!
        </h1>
        <p className="mt-2 text-base text-muted-foreground">
          Acesse sua conta para continuar
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        <LoginForm />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          © 2024 LMS Platform. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
