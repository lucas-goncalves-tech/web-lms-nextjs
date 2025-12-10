"use client";
import { CourseCard } from "./course-card";
import { useGetCourses } from "../hooks/use-get-courses";
import { CourseCardSkeleton } from "./course-card-skeleton";

export function CourseGrid() {
  const { data: courses, isLoading, error } = useGetCourses();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    );

  if (error)
    return <p className="text-center text-red-500">Erro ao carregar cursos</p>;

  return (
    <div>
      <h3 className="mb-4 text-2xl font-bold text-foreground text-center">
        Meus Cursos
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses?.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum curso encontrado.
          </p>
        ) : (
          courses?.map((course) => (
            <CourseCard
              key={course.title}
              slug={course.slug}
              title={course.title}
              description={course.description}
              totalLessons={course.totalLessons}
              totalSeconds={course.totalSeconds}
              completedLessons={course.completedLessons}
            />
          ))
        )}
      </div>
    </div>
  );
}
