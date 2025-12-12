import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { CourseForm } from "./schemas/course-form";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Pencil } from "lucide-react";
import { CourseDeleteAlert } from "./course-delete-alert";

type Props = {
  course: CourseForm;
  onEdit: (course: CourseForm) => void;
  onDelete: (course: CourseForm) => void;
};

export function CourseActionsDropdown({ course, onEdit, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(course)}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
        <CourseDeleteAlert course={course} handleDeleteConfirm={onDelete} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
