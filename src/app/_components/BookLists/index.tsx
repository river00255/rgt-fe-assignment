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
        {data && data.totalCount < 1 && (
          <p style={{ margin: '20px 0', fontSize: '15px' }}>
            등록된 도서가 없습니다.
          </p>
        )}
        {data?.book.map((item: BookItem) => (
          <BookPreview item={item} key={item.id} />
        ))}
      </div>
      {data && data.totalCount > 0 && (
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
