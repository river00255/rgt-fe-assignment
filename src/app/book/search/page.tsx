import SearchForm from '@/app/_components/SearchForm';
import SearchResultLists from '@/app/_components/SearchResultLists';
import Loading from '@/app/loading';
import { Suspense } from 'react';

const Search = () => {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <SearchForm />
        <SearchResultLists />
      </Suspense>
    </div>
  );
};

export default Search;
