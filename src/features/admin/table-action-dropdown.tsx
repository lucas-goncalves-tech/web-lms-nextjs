"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { CourseForm } from "./schemas/course-form";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { CourseDeleteAlert } from "./course-delete-alert";
import { CourseFormDialog } from "./course-form-dialog";
import { useState } from "react";

type Props = {
  course: CourseForm;
};

export function CourseActionsDropdown({ course }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <CourseFormDialog
          course={course}
          onDropdownClose={() => setOpen(false)}
        />
        <CourseDeleteAlert
          course={course}
          onDropdownClose={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
