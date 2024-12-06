'use client';
import { bookQueries } from '@/api-server';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import BookPreview from '../BookPreview';
import { BookItem } from '@/app/type';
import styles from './list.module.scss';
import Pagiantion from '../Pagination';

const BookLists = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery(bookQueries.getList({ page: currentPage }));

  return (
    <>
      <div className={styles.list}>
        {data?.book.map((item: BookItem) => (
          <BookPreview item={item} key={item.id} />
        ))}
      </div>
      {data && (
        <Pagiantion
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={10}
          totalElement={data.totalCount}
        />
      )}
    </>
  );
};

export default BookLists;
