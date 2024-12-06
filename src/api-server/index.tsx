import { BookItem } from '@/app/type';
import { queryOptions } from '@tanstack/react-query';
import { BookKeys } from './key';

export const addBook = async (book: Omit<BookItem, 'id' | 'createdAt'>) => {
  try {
    const response = await fetch('../api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const updateBook = async (book: BookItem) => {
  try {
    const response = await fetch(`../api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const deleteBook = async (id: number) => {
  try {
    const response = await fetch(`../api/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

const getBookList = async ({ page }: { page: number }) => {
  try {
    const response = await fetch(`../api/books?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

const getBook = async (id: string) => {
  try {
    const response = await fetch(`../api/books/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export const bookQueries = {
  getList: ({ page }: { page: number }) =>
    queryOptions({
      queryKey: BookKeys.list(page),
      queryFn: async () => await getBookList({ page }),
    }),
  getbyId: ({ id }: { id: string }) =>
    queryOptions({
      queryKey: BookKeys.item(id),
      queryFn: async () => await getBook(id),
    }),
};
