import Link from 'next/link';
import './header.scss';
import SearchForm from '../SearchForm';

const Header = () => {
  return (
    <header className="header">
      <div>
        <h1>
          <Link href={'/'}>Book Store</Link>
        </h1>
        <p>RGT FE Assignment</p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href={'../book/add'}>도서등록</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
