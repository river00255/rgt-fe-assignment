export const BookKeys = {
  all: ['book'] as const,
  allList: () => [...BookKeys.all, 'list'] as const,
  list: (page: number) => [...BookKeys.all, 'list', { page }] as const,
  item: (id: string) => [...BookKeys.all, 'item', id] as const,
};
