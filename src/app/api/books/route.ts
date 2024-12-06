import prisma from '@/libs/prisma';
import { NextRequest } from 'next/server';

const PAGE_SIZE = 10;

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');

  const count = await prisma.book.count();

  if (!page)
    return new Response(
      JSON.stringify({ message: 'Failed to get book list.' }),
      {
        status: 400,
      }
    );

  const book = await prisma.book.findMany({
    orderBy: {
      id: 'asc',
    },
    take: PAGE_SIZE,
    skip: (Number(page) - 1) * PAGE_SIZE,
  });

  return Response.json({
    book,
    totalCount: count,
  });
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const book = await prisma.book.create({
      data,
    });

    return Response.json(book);
  } catch (e) {
    return new Response(JSON.stringify({ message: 'Failed to add book.' }), {
      status: 500,
    });
  }
};
