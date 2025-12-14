export const adminQueryKeys = {
  getAllCourses: () => ["admin-courses-table"] as const,
  usersBase: () => ["admin-users-table"] as const,
  getAllUsers: (params?: { search?: string; page?: number; limit?: number }) =>
    [...adminQueryKeys.usersBase(), params] as const,
  getAllLessons: (courseSlug: string) =>
    ["admin-lessons-table", courseSlug] as const,
} as const;
