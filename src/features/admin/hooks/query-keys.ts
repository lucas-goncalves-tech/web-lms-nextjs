export const adminQueryKeys = {
  getAllCourses: () => ["admin-courses-table"] as const,
  getAllUsers: () => ["admin-users-table"] as const,
  getAllLessons: (courseSlug: string) =>
    ["admin-lessons-table", courseSlug] as const,
} as const;
