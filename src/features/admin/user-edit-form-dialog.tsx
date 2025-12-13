"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FormError } from "@/shared/components/ui/form-error";
import { Switch } from "@/shared/components/ui/switch";
import { Pencil, User, Shield, UserIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { useForm, Controller } from "react-hook-form";
import { UserEditForm, userEditSchema } from "./schemas/user-edit";
import { UserForm } from "./user-table";
import { useUpdateUser } from "./hooks/use-update-user";
import { useState } from "react";

type Props = {
  user: UserForm;
  dropdownClose: () => void;
};

export function UserEditFormDialog({ user, dropdownClose }: Props) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: editUser, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<UserEditForm>({
    resolver: zodResolver(userEditSchema),
    mode: "onChange",
    defaultValues: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  });

  const onSubmit = async (data: UserEditForm) => {
    await editUser(data);
    dropdownClose();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    dropdownClose();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Atualize as informações do usuário
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <Input
              id="name"
              type="text"
              label="Nome"
              placeholder="John Doe"
              icon={User}
              {...register("name")}
            />
            <FormError error={errors.name} />
          </div>

          {/* Role Toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Tipo de Usuário
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
                  <div
                    className={`flex flex-1 items-center gap-2 ${
                      field.value === "USER"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <UserIcon className="size-4 transition-colors" />
                    <span className="text-sm font-medium transition-colors">
                      User
                    </span>
                  </div>

                  <Switch
                    checked={field.value === "ADMIN"}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "ADMIN" : "USER")
                    }
                    className="mx-4 data-[state=checked]:bg-amber-500"
                  />

                  <div
                    className={`flex flex-1 items-center justify-end gap-2 ${
                      field.value === "ADMIN"
                        ? "text-amber-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-medium transition-colors">
                      Admin
                    </span>
                    <Shield className="size-4 transition-colors" />
                  </div>
                </div>
              )}
            />
            <FormError error={errors.role} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending || !isValid}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
