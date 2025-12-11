import { Clock, Video, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import Link from "next/link";
import { formatHoursMinutes } from "@/shared/helpers/format-duration";

interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  totalSeconds: number;
  totalLessons: number;
  completedLessons: number;
}

export function CourseCard({
  slug,
  title,
  description,
  totalSeconds,
  totalLessons,
  completedLessons,
}: CourseCardProps) {
  const progress = Math.round((completedLessons / totalLessons) * 100);
  const isCompleted = progress === 100;

  return (
    <Link href={`/course/${slug}`}>
      <Card className="group transition-colors hover:bg-card/80">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {description}
              </CardDescription>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Metrics */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Video size={14} />
              {totalLessons} aulas
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatHoursMinutes(totalSeconds)}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          {/* Progress Bar */}
          <div className="w-full space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  isCompleted ? "bg-green-500" : "bg-primary"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {progress === 0
                ? "Não iniciado"
                : isCompleted
                ? "Concluído"
                : `${progress}% concluído`}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
