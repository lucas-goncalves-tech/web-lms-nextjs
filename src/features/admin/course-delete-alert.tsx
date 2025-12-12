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
import { CourseForm } from "./schemas/course-form";
import { Trash2 } from "lucide-react";

type Props = {
  course: CourseForm;
  handleDeleteConfirm: (course: CourseForm) => void;
};

export function CourseDeleteAlert({ course, handleDeleteConfirm }: Props) {
  return (
    <AlertDialog>
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
          <AlertDialogTitle>Excluir curso</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o curso{" "}
            <span className="font-semibold text-foreground">
              {course.title}
            </span>
            ? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteConfirm(course)}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
