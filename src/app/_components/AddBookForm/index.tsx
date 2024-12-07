'use client';
import { BookItem } from '@/app/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import styles from './addForm.module.scss';
import { addBook } from '@/api-server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BookKeys } from '@/api-server/key';
import { useState } from 'react';
import InputImageFile from '../InputImageFile';

const schema = z.object({
  isbn: z.string(),
  title: z.string().trim().min(1, { message: '책 제목을 입력하세요.' }),
  author: z.string().trim().min(1, { message: '작가명을 입력하세요.' }),
  publisher: z.string(),
  description: z.string(),
  quantity: z
    .number()
    .gte(1, { message: '수량을 1권 이상 입력하세요.' })
    .lte(999, { message: '999권 이하만 등록 가능합니다.' }),
});

const AddBookForm = () => {
  const [image, setImage] = useState<{
    url: string;
    name: string;
  }>({
    url: '',
    name: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<BookItem, 'id' | 'cover' | 'createdAt'>>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: addBookItem } = useMutation({
    mutationFn: addBook,
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
    addBookItem({ ...data, cover: image.url });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addForm}>
      <label htmlFor="isbn">isbn</label>
      <input type="text" {...register('isbn')} />
      <label htmlFor="title">제 목 *</label>
      <input type="text" {...register('title')} />
      {errors.title?.message && (
        <span className={styles.errorMessage}>{errors.title?.message}</span>
      )}
      <label htmlFor="author">작가명 *</label>
      <input type="text" {...register('author')} />
      {errors.author?.message && (
        <span className={styles.errorMessage}>{errors.author?.message}</span>
      )}
      <label htmlFor="publisher">출판사명</label>
      <input type="text" {...register('publisher')} />
      <label htmlFor="description">설 명</label>
      <textarea {...register('description')} rows={3} />
      <label htmlFor="quantity">수 량</label>
      <input
        type="number"
        defaultValue={1}
        {...register('quantity', { valueAsNumber: true })}
      />
      {errors.quantity?.message && (
        <span className={styles.errorMessage}>{errors.quantity?.message}</span>
      )}
      <InputImageFile image={image} setImage={setImage} />
      <button>등록하기</button>
    </form>
  );
};

export default AddBookForm;
