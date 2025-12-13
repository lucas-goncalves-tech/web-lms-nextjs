import { AdminCourseHeader } from "@/features/admin/admin-course-header";
import { LessonsTable } from "@/features/admin/lessons-table";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

export default async function AdminCoursePage({ params }: Props) {
  const { courseSlug } = await params;
  return (
    <div className="w-full max-w-7xl">
      <AdminCourseHeader courseSlug={courseSlug} />
      <LessonsTable courseSlug={courseSlug} />
    </div>
  );
}
