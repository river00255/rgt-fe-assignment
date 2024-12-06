import { Suspense } from 'react';
import BookLists from './_components/BookLists';
import SearchForm from './_components/SearchForm';
import Loading from './loading';

export default function Home() {
  return (
    <div className="container">
      <h3>도서 목록</h3>
      <BookLists />
      <Suspense fallback={<Loading />}>
        <SearchForm />
      </Suspense>
    </div>
  );
}
