import prisma from '@/libs/prisma';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!book)
    return new Response(
      JSON.stringify({ message: `Not Found review ${params.id}.` }),
      {
        status: 404,
      }
    );

  return Response.json(book);
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const id = Number(params.id);
  const data = await request.json();

  const prevBook = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!prevBook)
    return new Response(
      JSON.stringify({ message: `Not Found book ${params.id}.` }),
      { status: 404 }
    );

  const updated = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return Response.json(updated);
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = Number(params.id);

    const deletedBook = await prisma.book.delete({
      where: {
        id,
      },
    });

    if (!deletedBook)
      return new Response(
        JSON.stringify({ message: `Failed to delete book ${params.id}.` }),
        { status: 404 }
      );

    return new Response(id.toString(), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ message: `Failed to delete book ${params.id}.` }),
      { status: 500 }
    );
  }
};
