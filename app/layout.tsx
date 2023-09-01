import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Armageddon',
  description: 'Save planet from asteroids',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div><Image className={styles.earth} src="/img/planeta_zemlia.jpg" alt="earth" width={400} height={620} /></div>
        {children}
      </body>
    </html>
  );
}
