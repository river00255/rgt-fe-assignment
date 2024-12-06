import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  publisher: z.string(),
  description: z.string(),
  cover: z.string(),
  quantity: z.number(),
});

export type BookItem = z.infer<typeof BookSchema>;
