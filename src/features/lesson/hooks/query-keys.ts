export const lessonKeys = {
  lesson: {
    uniqueWithCourse: (courseSlug: string, lessonSlug: string) =>
      ["lesson", courseSlug, lessonSlug] as const,
  },
} as const;
