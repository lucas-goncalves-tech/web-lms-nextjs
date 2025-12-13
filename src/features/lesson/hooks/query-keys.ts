export const lessonKeys = {
  getUniqueWithCourse: (courseSlug: string, lessonSlug: string) =>
    ["lesson", courseSlug, lessonSlug] as const,
  allUnique: (courseSlug: string) => ["lesson", courseSlug] as const,
} as const;
