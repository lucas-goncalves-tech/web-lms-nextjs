export const adminQueryKeys = {
  courses: {
    all: () => ["admin-courses"] as const,
    table: () => ["admin-courses-table"] as const,
  },
  users: {
    table: () => ["admin-users-table"] as const,
  },
} as const;
