"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { CourseForm } from "./schemas/course-form";
import { Button } from "@/shared/components/ui/button";
import { Book, MoreHorizontal } from "lucide-react";
import { CourseDeleteAlert } from "./course-delete-alert";
import { CourseFormDialog } from "./course-form-dialog";
import { useState } from "react";
import Link from "next/link";

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
        <Link href={`/admin/courses/${course.slug}`}>
          <DropdownMenuItem>
            <Book className="size-4" />
            Ver aulas
          </DropdownMenuItem>
        </Link>
        <CourseDeleteAlert
          course={course}
          onDropdownClose={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
