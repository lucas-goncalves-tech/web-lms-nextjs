"use client";
import { Video, Clock, TrendingUp } from "lucide-react";
import { useGetLessons } from "./hooks/use-get-lessons";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { formatHoursMinutes } from "@/shared/lib/format-duration";

type Props = {
  courseSlug: string;
};

function transformSlugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function CourseHeader({ courseSlug }: Props) {
  const { data: lessons, isLoading } = useGetLessons(courseSlug);
  const title = transformSlugToTitle(courseSlug);

  const totalLessons = lessons?.length ?? 0;
  const completedLessons = lessons?.filter((l) => l.completed).length ?? 0;
  const totalSeconds = lessons?.reduce((acc, l) => acc + l.seconds, 0) ?? 0;
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = progress === 100;

  return (
    <header className="w-full mb-8">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground tracking-tight mb-6">
        {title}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto mb-6">
        {/* Total Lessons */}
        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-card border border-border/50">
          <Video className="size-4 md:size-5 text-primary mb-1.5" />
          <span className="text-xs text-muted-foreground">Aulas</span>
          {isLoading ? (
            <Skeleton className="w-8 h-5 mt-1" />
          ) : (
            <span className="text-lg md:text-xl font-semibold text-foreground">
              {totalLessons}
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-card border border-border/50">
          <Clock className="size-4 md:size-5 text-primary mb-1.5" />
          <span className="text-xs text-muted-foreground">Duração</span>
          {isLoading ? (
            <Skeleton className="w-12 h-5 mt-1" />
          ) : (
            <span className="text-lg md:text-xl font-semibold text-foreground">
              {formatHoursMinutes(totalSeconds)}
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-card border border-border/50">
          <TrendingUp
            className={`size-4 md:size-5 mb-1.5 ${
              isCompleted ? "text-emerald-500" : "text-primary"
            }`}
          />
          <span className="text-xs text-muted-foreground">Progresso</span>
          {isLoading ? (
            <Skeleton className="w-10 h-5 mt-1" />
          ) : (
            <span
              className={`text-lg md:text-xl font-semibold ${
                isCompleted ? "text-emerald-500" : "text-foreground"
              }`}
            >
              {progress}%
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto space-y-2">
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          {isLoading ? (
            <Skeleton className="h-full w-1/3" />
          ) : (
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? "bg-emerald-500" : "bg-primary"
              }`}
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
        <p className="text-xs text-center text-muted-foreground">
          {isLoading
            ? ""
            : progress === 0
            ? "Não iniciado"
            : isCompleted
            ? "Curso concluído! 🎉"
            : `${completedLessons} de ${totalLessons} aulas concluídas`}
        </p>
      </div>
    </header>
  );
}
