'use client';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './searchForm.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

type QueryType = 'title' | 'author';

const SearchForm = () => {
  const [type, setType] = useState<QueryType>('title');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const searchType = searchParams.get('type');
  const searchText = searchParams.get('query');

  const router = useRouter();

  const searching = (type: QueryType, q: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('type', type);
    searchParams.set('query', encodeURIComponent(q));
    router.push(`../book/search?${searchParams.toString()}`);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef.current || inputRef.current.value.trim().length < 1) return;
    const inputValue = inputRef.current.value.trim().replaceAll(' ', '+');
    searching(type, inputValue);
  };

  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <div>
        <select
          onChange={(e) => setType(e.target.value as QueryType)}
          defaultValue={searchType || type}>
          <option value="title">제목</option>
          <option value="author">저자</option>
        </select>
        <input
          type="text"
          ref={inputRef}
          placeholder="검색어를 입력하세요"
          defaultValue={
            searchText ? decodeURIComponent(String(searchText)) : ''
          }
        />
      </div>
      <button>검 색</button>
    </form>
  );
};

export default SearchForm;
