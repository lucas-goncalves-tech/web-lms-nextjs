"use client";

import { MinimalistProgress } from "@/shared/components/ui/minimalist-progress";
import { transformSlugToTitle } from "../course/course-header";
import { useGetLessons } from "../course/hooks/use-get-lessons";
import { useGetUniqueLesson } from "./hooks/use-get-unique-lesson";
import { LessonHeaderSkeleton } from "./lesson-header-skeleton";

type Props = {
  courseSlug: string;
  lessonSlug: string;
};

export function LessonHeader({ courseSlug, lessonSlug }: Props) {
  const { data: lessons } = useGetLessons(courseSlug);
  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetUniqueLesson(courseSlug, lessonSlug);
  const totalLessons = lessons?.length ?? 0;
  const completedLessons = lessons?.filter((l) => l.completed).length ?? 0;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (isLoading) {
    return <LessonHeaderSkeleton />;
  }

  if (isError) {
    return <p className="text-center text-red-500">Erro ao carregar a aula</p>;
  }

  return (
    <div className="mb-6 space-y-2 flex items-start justify-between gap-1 flex-col md:flex-row md:items-center md:gap-4">
      <div>
        <h1 className="text-xl space-x-2 md:text-2xl font-bold text-center text-foreground tracking-tight">
          <span className="inline-block text-muted-foreground">
            {lesson?.order.toString().padStart(2, "0")}
          </span>
          <span className="inline-block">{lesson?.title}</span>
        </h1>
        <p className="text-muted-foreground text-sm">
          Curso &gt; {transformSlugToTitle(courseSlug)}
        </p>
      </div>
      <MinimalistProgress progress={progress} />
    </div>
  );
}
