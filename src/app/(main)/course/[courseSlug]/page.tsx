import CourseHeader from "@/features/course/course-header";
import { LessonsList } from "@/features/course/lessons-list";

type Props = {
  params: Promise<{
    courseSlug: string;
  }>;
};

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;

  return (
    <div className="w-full max-w-5xl">
      <CourseHeader courseSlug={courseSlug} />
      <LessonsList courseSlug={courseSlug} />
    </div>
  );
}
