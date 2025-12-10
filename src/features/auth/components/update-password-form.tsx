"use client";

import { Lock, KeyRound, ShieldCheck } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useForm } from "react-hook-form";
import {
  UpdatePassword,
  updatePasswordSchema,
} from "../schemas/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormError } from "@/shared/components/ui/form-error";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { toast } from "sonner";
import { apiClient } from "@/shared/lib/api/client";

export function UpdatePasswordForm() {
  const form = useForm<UpdatePassword>({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UpdatePassword) => {
    try {
      await apiClient.put("/auth/password/update", data);
      toast.success("Senha atualizada com sucesso!");
      form.reset();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };
  return (
    <div className="max-w-xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Atualize sua senha regularmente para manter sua conta segura
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Current Password */}
            <div>
              <Input
                id="currentPassword"
                type="password"
                label="Senha Atual"
                placeholder="Digite sua senha atual"
                icon={Lock}
                {...form.register("currentPassword")}
              />
              <FormError error={form.formState.errors.currentPassword} />
            </div>

            {/* New Password */}
            <div>
              <Input
                id="newPassword"
                type="password"
                label="Nova Senha"
                placeholder="Digite sua nova senha"
                icon={KeyRound}
                {...form.register("newPassword")}
              />
              <FormError error={form.formState.errors.newPassword} />
            </div>

            {/* Confirm Password */}
            <div>
              <Input
                id="confirmPassword"
                type="password"
                label="Confirmar Nova Senha"
                placeholder="Confirme sua nova senha"
                icon={KeyRound}
                {...form.register("confirmPassword")}
              />
              <FormError error={form.formState.errors.confirmPassword} />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting
                ? "Atualizando..."
                : "Atualizar Senha"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <Card>
        <CardContent>
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Dicas de Segurança
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Use uma senha única para esta conta</li>
            <li>• Combine letras maiúsculas, minúsculas, números e símbolos</li>
            <li>• Nunca compartilhe sua senha com terceiros</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
