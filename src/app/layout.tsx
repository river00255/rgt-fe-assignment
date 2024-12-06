import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './reset.css';
import './globals.scss';
import Header from './_components/Header';
import QueryProvider from '@/libs/QueryProvider';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: 'RGT FE Assignment',
  description: 'RGT FE Assignment',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
