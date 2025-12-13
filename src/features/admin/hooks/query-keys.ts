export const adminQueryKeys = {
  courses: {
    all: () => ["admin-courses-table"] as const,
  },
  users: {
    all: () => ["admin-users-table"] as const,
  },
} as const;
