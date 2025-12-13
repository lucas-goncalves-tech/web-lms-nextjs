"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { LessonDeleteAlert } from "./lesson-delete-alert";
import { useState } from "react";
import { LessonTable } from "./schemas/lessons";
import { LessonFormDialog } from "./lesson-form-dialog";

type Props = {
  lesson: LessonTable;
  courseSlug: string;
};

export function LessonActionsDropdown({ lesson, courseSlug }: Props) {
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
        <LessonFormDialog
          lesson={lesson}
          courseSlug={courseSlug}
          onDropdownClose={() => setOpen(false)}
        />
        <LessonDeleteAlert
          lesson={lesson}
          courseSlug={courseSlug}
          onDropdownClose={() => setOpen(false)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
