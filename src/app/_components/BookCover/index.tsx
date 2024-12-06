import Image from 'next/image';
import styles from './cover.module.scss';

const BookCover = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className={styles.cover}>
      {url ? (
        <Image src={url} alt={title} width={85} height={129} />
      ) : (
        <div className={styles.placeholder}>
          <p>No Image</p>
        </div>
      )}
    </div>
  );
};

export default BookCover;
