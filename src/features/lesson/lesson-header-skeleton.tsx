import { Skeleton } from "@/shared/components/ui/skeleton";

export function LessonHeaderSkeleton() {
  return (
    <div className="mb-6 space-y-2 flex items-start justify-between gap-1 flex-col md:flex-row md:items-center md:gap-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-7" />
          <Skeleton className="w-48 h-7" />
        </div>
        <Skeleton className="w-32 h-4" />
      </div>
      <Skeleton className="w-20 h-5 rounded-md" />
    </div>
  );
}
