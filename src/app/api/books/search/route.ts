import prisma from '@/libs/prisma';
import { NextRequest } from 'next/server';

const PAGE_SIZE = 10;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  if (!page)
    return new Response(
      JSON.stringify({ message: 'Failed to get search list.' }),
      {
        status: 400,
      }
    );

  if (!type || !query)
    return new Response(
      JSON.stringify({ message: 'Not Found search result.' }),
      {
        status: 404,
      }
    );

  if (type === 'title') {
    const book = await prisma.book.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: PAGE_SIZE,
      skip: (Number(page) - 1) * PAGE_SIZE,
    });

    return Response.json({
      book,
      totalCount: book.length,
    });
  }

  if (type === 'author') {
    const book = await prisma.book.findMany({
      where: {
        author: {
          contains: query,
        },
      },
      orderBy: {
        id: 'asc',
      },
      take: PAGE_SIZE,
      skip: (Number(page) - 1) * PAGE_SIZE,
    });

    return Response.json({
      book,
      totalCount: book.length,
    });
  }

  const book = await prisma.book.findMany({
    orderBy: {
      id: 'asc',
    },
    take: PAGE_SIZE,
    skip: (Number(page) - 1) * PAGE_SIZE,
  });

  return Response.json({
    book,
    totalCount: book.length,
  });
};
