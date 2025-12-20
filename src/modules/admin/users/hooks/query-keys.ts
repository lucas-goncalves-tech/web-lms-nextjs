export const adminUsersQueryKeys = {
  usersBase: () => ["admin-users-table"] as const,
  getAllUsers: (params?: { search?: string; page?: number; limit?: number }) =>
    [...adminUsersQueryKeys.usersBase(), params] as const,
};
