import Link from 'next/link';
import './header.scss';

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
            <Link href={'../add'}>도서등록</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
