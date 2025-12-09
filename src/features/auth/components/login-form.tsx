"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { loginSchema, LoginSchema } from "../schemas/login";
import { getErrorMessage } from "@/lib/api/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/features/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data);
      toast.success("Login realizado com sucesso!");
      router.replace("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      {/* Card */}
      <div className="w-full rounded-xl border border-border/50 bg-card/50 p-6 shadow-lg backdrop-blur-md sm:p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <Input
              id="email"
              type="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              icon={Mail}
              {...form.register("email")}
            />
            <FormError error={form.formState.errors.email} />
          </div>

          {/* Password Field */}
          <div>
            <Input
              id="password"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              icon={Lock}
              {...form.register("password")}
            />
            <FormError error={form.formState.errors.password} />
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Submit Button */}
          <Button className="w-full" disabled={isPending}>
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link
          href="/auth/register"
          className="text-primary font-medium hover:underline"
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
