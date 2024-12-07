import { uploadImageFile } from '@/api-server/upload';
import { compressImage } from '@/utils';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import BookCover from '../BookCover';
import styles from './inputFIle.module.scss';

const InputImageFile = ({
  image,
  setImage,
}: {
  image: { url: string; name: string };
  setImage: Dispatch<SetStateAction<{ url: string; name: string }>>;
}) => {
  const inputImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('5mb 이하의 파일을 첨부해주세요.');
        return;
      }
      const compressedImage = await compressImage(file);
      if (compressedImage) {
        const result = await uploadImageFile(compressedImage);
        if (result) setImage({ url: result.url, name: result.name });
      }
    }
  };

  return (
    <>
      <label htmlFor="cover">표지 이미지</label>
      <input type="file" accept="image/*" onChange={(e) => inputImage(e)} />
      <div className={styles.thumbnail}>
        <BookCover url={image.url} title={image.name} />
      </div>
    </>
  );
};

export default InputImageFile;
