# RGT front-end 과제

### 1. 설치 및 실행 방법

- 환경변수 등록

```
DATABASE_URL=
AWS_REGION=
AWS_BUCKET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

- 설치 및 실행

```
npm install
npm run dev
```

### 2. 구현 목록

- [x] 책 목록 페이지
  - 페이지네이션
  - 제목 또는 저자로 검색
- [x] 책 상세 정보 페이지
  - 내용 수정, 수량 변경
  - 삭제
- [x] 도서 등록 페이지
- [x] postgresql 데이터베이스, next route handlers와 prisma로 api 요청 및 응답

### 3. 사용한 프레임워크 및 라이브러리

Next.js, Typscript, Sass, React Hook Form, Zod
