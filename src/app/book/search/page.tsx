'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { searchBook } from '@/api-server';
import { BookKeys } from '@/api-server/key';
import { BookItem } from '@/app/type';
import BookPreview from '@/app/_components/BookPreview';
import SearchForm from '@/app/_components/SearchForm';
import styles from './search.module.scss';
import Pagiantion from '@/app/_components/Pagination';

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const query = searchParams.get('query');

  const { data } = useQuery({
    queryKey: BookKeys.search(String(type), String(query), currentPage),
    queryFn: () =>
      searchBook({
        type: String(type),
        query: String(query),
        page: currentPage,
      }),
    enabled: !!type && !!query,
  });

  return (
    <div className="container">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchForm />
      </Suspense>
      {data && (
        <p style={{ textAlign: 'center', margin: '32px 0 16px 0' }}>
          <strong>{data.totalCount}</strong> 건의 검색 결과
        </p>
      )}
      <div className={styles.list}>
        {data && data.totalCount < 1 && <p>검색 결과가 없습니다.</p>}
        {data &&
          data.book.map((item: BookItem) => (
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
    </div>
  );
};

export default Search;
