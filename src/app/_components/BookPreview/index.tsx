import { BookItem } from '@/app/type';
import styles from './preview.module.scss';
import Link from 'next/link';
import BookCover from '../BookCover';

const BookPreview = ({ item }: { item: BookItem }) => {
  return (
    <Link href={`../book/${item.id}`}>
      <div className={styles.preview}>
        <div className={styles.image}>
          <BookCover url={item.cover} title={item.title} />
        </div>
        <div className={styles.text}>
          <p>{item.author}</p>
          <p>
            <strong>{item.title}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookPreview;
