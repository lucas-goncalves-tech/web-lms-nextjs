"use client";

import { BookOpen, Hash, Clock, Video, FileText } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { EditLesson, editLessonSchema, LessonTable } from "./schemas/lessons";
import { InputFile } from "@/shared/components/ui/input-file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormError } from "@/shared/components/ui/form-error";

type Props = {
  lesson: LessonTable;
  courseSlug: string;
  onDropdownClose?: () => void;
};

export function EditLessonDialog({
  lesson,
  courseSlug,
  onDropdownClose,
}: Props) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditLesson>({
    resolver: zodResolver(editLessonSchema),
    defaultValues: {
      slug: lesson.slug,
      title: lesson.title,
      seconds: lesson.seconds,
      description: lesson.description,
      order: lesson.order,
    },
  });

  const handleCancel = () => {
    setOpen(false);
    onDropdownClose?.();
    reset();
  };

  const onSubmit = (data: EditLesson) => {
    console.log("Edit lesson for course:", courseSlug, data);
    setOpen(false);
    onDropdownClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Aula</DialogTitle>
          <DialogDescription>Atualize as informações da aula</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div>
            <Input
              id="title"
              type="text"
              label="Título"
              placeholder="Introdução ao JavaScript"
              icon={BookOpen}
              {...register("title")}
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
              placeholder="Descrição da aula..."
              rows={3}
              {...register("description")}
            />
            <FormError error={errors.description} />
          </div>

          {/* Video Field */}
          <div>
            <InputFile
              id="video"
              label="Novo arquivo de vídeo (opcional)"
              icon={Video}
              {...register("video")}
            />
            <FormError error={errors.video} />
            <p className="text-xs text-muted-foreground mt-1">
              Vídeo atual: {lesson.video}
            </p>
          </div>

          {/* Duration Field */}
          <div>
            <Input
              id="seconds"
              type="number"
              label="Duração (segundos)"
              placeholder="600"
              icon={Clock}
              {...register("seconds", { valueAsNumber: true })}
            />
            <FormError error={errors.seconds} />
          </div>

          {/* Order Field */}
          <div>
            <Input
              id="order"
              type="number"
              label="Ordem"
              placeholder="1"
              icon={FileText}
              {...register("order", { valueAsNumber: true })}
            />
            <FormError error={errors.order} />
          </div>

          {/* Slug Field */}
          <div>
            <Input
              id="slug"
              type="text"
              label="Slug"
              placeholder="introducao-ao-javascript"
              icon={Hash}
              disabled
              {...register("slug")}
            />
            <FormError error={errors.slug} />
            <p className="text-xs text-muted-foreground mt-1">
              O slug não pode ser alterado
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
