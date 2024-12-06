'use client';
import { BookItem } from '@/app/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './editForm.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook, updateBook } from '@/api-server';
import { useRouter } from 'next/navigation';
import { BookKeys } from '@/api-server/key';
import BookCover from '../BookCover';

const schema = z.object({
  isbn: z.string(),
  title: z.string().trim().min(1, { message: '책 제목을 입력하세요.' }),
  author: z.string().trim().min(1, { message: '작가명을 입력하세요.' }),
  publisher: z.string(),
  description: z.string(),
  quantity: z.number().gte(1, { message: '수량을 1권 이상 입력하세요.' }),
});

const EditBookForm = ({ item }: { item: BookItem }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<BookItem, 'id' | 'cover' | 'createdAt'>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const { mutate: modifyBook } = useMutation({
    mutationFn: updateBook,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: BookKeys.item(String(item.id)),
      }),
  });

  const { mutate: deleteBookItem } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BookKeys.allList,
      });
      router.push('/');
    },
  });

  const onSubmit: SubmitHandler<
    Omit<BookItem, 'id' | 'cover' | 'createdAt'>
  > = async (data) => {
    modifyBook({ ...data, cover: item.cover, id: item.id });
  };

  const onDelelteSubmit = (id: number) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteBookItem(id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
      <label htmlFor="isbn">isbn</label>
      <input type="text" {...register('isbn')} defaultValue={item.isbn} />
      <label htmlFor="title">제 목 *</label>
      <input type="text" {...register('title')} defaultValue={item.title} />
      {errors.title?.message && (
        <span className={styles.errorMessage}>{errors.title?.message}</span>
      )}
      <label htmlFor="author">작가명 *</label>
      <input type="text" {...register('author')} defaultValue={item.author} />
      {errors.author?.message && (
        <span className={styles.errorMessage}>{errors.author?.message}</span>
      )}
      <label htmlFor="publisher">출판사명</label>
      <input
        type="text"
        {...register('publisher')}
        defaultValue={item.publisher}
      />
      <label htmlFor="description">설 명</label>
      <input
        type="text"
        {...register('description')}
        defaultValue={item.description}
      />
      <label htmlFor="quantity">수 량</label>
      <input
        type="number"
        defaultValue={item.quantity}
        {...register('quantity', { valueAsNumber: true })}
      />
      {errors.quantity?.message && (
        <span className={styles.errorMessage}>{errors.quantity?.message}</span>
      )}
      {/* <label htmlFor="cover">표지 이미지</label>
      <input type="file" /> */}
      <div className={styles.thumbnail}>
        <BookCover url={item.cover} title={item.title} />
      </div>
      <span className={styles.buttons}>
        <button type="button" onClick={() => onDelelteSubmit(item.id)}>
          삭제하기
        </button>
        <button>수정하기</button>
      </span>
    </form>
  );
};

export default EditBookForm;
