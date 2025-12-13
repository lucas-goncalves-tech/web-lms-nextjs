export const courseKeys = {
  course: {
    all: () => ["course"] as const,
    getCourse: (courseSlug: string) => ["course", courseSlug] as const,
  },
  lessons: {
    getLessons: (courseSlug: string) => ["lessons", courseSlug] as const,
  },
} as const;
