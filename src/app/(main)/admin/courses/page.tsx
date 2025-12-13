import { CourseTable } from "@/features/admin/course-table";
import { PageHeader } from "@/shared/components/ui/page-header";

export default function AdminCoursesPage() {
  return (
    <div className="w-full max-w-7xl">
      <PageHeader title="Cursos" subtitle="Administração de cursos" />
      <CourseTable />
    </div>
  );
}
