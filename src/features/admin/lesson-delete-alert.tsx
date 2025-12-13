"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { LessonTable } from "./schemas/lessons";

type Props = {
  lesson: LessonTable;
  courseSlug: string;
  onDropdownClose: () => void;
};

export function LessonDeleteAlert({
  lesson,
  courseSlug,
  onDropdownClose,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // TODO: Implement useDeleteLesson hook
  const handleDeleteConfirm = async () => {
    setIsPending(true);
    // TODO: Call deleteLession mutation
    console.log("Delete lesson:", lesson.slug, "from course:", courseSlug);
    setIsPending(false);
    setDeleteOpen(false);
    onDropdownClose();
  };

  const handleCancel = () => {
    setDeleteOpen(false);
    onDropdownClose();
  };

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2 className="size-4" />
          Excluir
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir aula</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir a aula{" "}
            <span className="font-semibold text-foreground">
              {lesson.title}
            </span>
            ? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isPending}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm} disabled={isPending}>
            {isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
