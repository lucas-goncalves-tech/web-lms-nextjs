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
import { LessonTable } from "./schemas/lessons";

type Props = {
  lesson?: LessonTable;
  courseSlug: string;
  onDropdownClose?: () => void;
};

export function LessonFormDialog({
  lesson,
  courseSlug,
  onDropdownClose,
}: Props) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!lesson;

  // TODO: Implement form with react-hook-form
  const handleCancel = () => {
    setOpen(false);
    onDropdownClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement create/update lesson logic
    console.log("Submit lesson for course:", courseSlug);
    setOpen(false);
    onDropdownClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditMode ? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Pencil className="size-4" />
            Editar
          </DropdownMenuItem>
        ) : (
          <Button>Nova Aula</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Aula" : "Criar Nova Aula"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Atualize as informações da aula"
              : "Preencha as informações da aula"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <Input
              id="title"
              type="text"
              label="Título"
              placeholder="Introdução ao JavaScript"
              icon={BookOpen}
              defaultValue={lesson?.title}
            />
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
              defaultValue={lesson?.description}
            />
          </div>

          {/* Video Field */}
          <div>
            <Input
              id="video"
              type="text"
              label="ID do Vídeo (YouTube)"
              placeholder="dQw4w9WgXcQ"
              icon={Video}
              defaultValue={lesson?.video}
            />
          </div>

          {/* Duration Field */}
          <div>
            <Input
              id="seconds"
              type="number"
              label="Duração (segundos)"
              placeholder="600"
              icon={Clock}
              defaultValue={lesson?.seconds}
            />
          </div>

          {/* Order Field */}
          <div>
            <Input
              id="order"
              type="number"
              label="Ordem"
              placeholder="1"
              icon={FileText}
              defaultValue={lesson?.order}
            />
          </div>
          {/* Slug Field */}
          <div>
            <Input
              id="slug"
              type="text"
              label="Slug"
              placeholder="introducao-ao-javascript"
              icon={Hash}
              disabled={isEditMode}
              defaultValue={lesson?.slug}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {isEditMode
                ? "O slug não pode ser alterado"
                : "URL amigável (apenas letras minúsculas, números e hífens)"}
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEditMode ? "Salvar" : "Criar Aula"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
