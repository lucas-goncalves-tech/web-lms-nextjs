export const certificatesKeys = {
  all: () => ["certificates"],
  byId: (id: string) => ["certificates", id],
} as const;
