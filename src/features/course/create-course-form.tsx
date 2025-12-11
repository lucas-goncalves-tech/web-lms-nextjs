"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookOpen, Hash } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { FormError } from "@/shared/components/ui/form-error";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Textarea } from "@/shared/components/ui/textarea";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { CreateCourse, createCourseSchema } from "./schemas/create-course";
import { useCreateCourse } from "./hooks/use-create-course";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .replace(/^-+|-+$/g, ""); // Remove hífens do início e fim
};

export function CreateCourseForm() {
  const router = useRouter();
  const { mutateAsync: createCourse } = useCreateCourse();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<CreateCourse>({
    resolver: zodResolver(createCourseSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      slug: "",
      title: "",
      description: "",
    },
  });

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (title) {
      const slug = generateSlug(title);
      setValue("slug", slug, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: CreateCourse) => {
    try {
      await createCourse(data);
      toast.success("Curso criado com sucesso!");
      reset();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 items-center justify-center rounded-full bg-primary/20 hidden md:flex">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Novo Curso</CardTitle>
            <CardDescription>
              Preencha as informações básicas do curso
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <div>
            <Input
              id="title"
              type="text"
              label="Título"
              placeholder="JavaScript Completo"
              icon={BookOpen}
              {...register("title", {
                onBlur: handleTitleBlur,
              })}
            />
            <FormError error={errors.title} />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Descrição
            </label>
            <Textarea
              id="description"
              placeholder="Descrição completa do curso..."
              rows={5}
              {...register("description")}
            />
            <FormError error={errors.description} />
          </div>

          {/* Slug Field */}
          <div>
            <Input
              id="slug"
              type="text"
              label="Slug"
              placeholder="javascript-completo"
              icon={Hash}
              {...register("slug")}
            />
            <p className="text-xs text-muted-foreground mt-1">
              SLUG amigável (apenas letras minúsculas, números e hífens)
            </p>
            <FormError error={errors.slug} />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/")}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Criando..." : "Criar Curso"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
