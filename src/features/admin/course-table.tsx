"use client";

import { useGetCoursesTable } from "./hooks/use-get-courses-table";
import { CourseForm } from "./schemas/course-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { CourseActionsDropdown } from "./table-action-dropdown";
import { TableSkeleton } from "./table-skeleton";
import { MobileCardSkeleton } from "./mobile-card-skeleton";
import { useDeleteCourse } from "./hooks/use-delete-course";

export function CourseTable() {
  const { data: courses, isLoading, isError } = useGetCoursesTable();
  const { mutateAsync: deleteCourse } = useDeleteCourse();

  if (isLoading) {
    return (
      <>
        <MobileCardSkeleton />
        <TableSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Erro ao carregar cursos</div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Nenhum curso encontrado</div>
      </div>
    );
  }

  const handleEdit = (course: CourseForm) => {
    // TODO: Implement edit dialog
    console.log("Edit course:", course);
  };

  const handleDeleteConfirm = async (course: CourseForm) => {
    await deleteCourse(course.slug);
  };

  return (
    <>
      {/* Mobile View - Cards */}
      <div className="block md:hidden space-y-3">
        {courses.map((course) => (
          <Card key={course.slug}>
            <CardContent className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {course.slug}
                </p>
                <h3 className="font-semibold text-foreground mt-1 truncate">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {course.description}
                </p>
              </div>
              <CourseActionsDropdown
                course={course}
                onEdit={handleEdit}
                onDelete={handleDeleteConfirm}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Slug</TableHead>
              <TableHead className="w-[200px]">Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[80px] text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.slug}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {course.slug}
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="text-muted-foreground max-w-[300px] line-clamp-2">
                  {course.description}
                </TableCell>
                <TableCell className="text-center">
                  <CourseActionsDropdown
                    course={course}
                    onEdit={handleEdit}
                    onDelete={handleDeleteConfirm}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
