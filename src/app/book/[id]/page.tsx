'use client';
import { bookQueries } from '@/api-server';
import EditBookForm from '@/app/_components/EditBookForm';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const BookItem = () => {
  const { id } = useParams();

  const { data } = useQuery(bookQueries.getbyId({ id: id.toString() }));

  return (
    <div className="container">
      <h3>도서 상세 정보</h3>
      {data && <EditBookForm item={data} />}
    </div>
  );
};

export default BookItem;
