'use client';
import { useEffect, useRef, useState } from 'react';
import Header from '../app/components/header/Header';
import Image from 'next/image';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Armageddon',
  description: 'Save the planet from asteroids',
};


export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const [isEarthStatic, setIsEarthStatic] = useState(true);
  const observerTargetEarth = useRef(null);

  useEffect(() => {
    function observerEarthObserve() {
      if (observerTargetEarth.current) {
        observerEarth.observe(observerTargetEarth.current);
      }
    };
    function observerEarthUnobserve() {
      if (observerTargetEarth.current) {
        observerEarth.unobserve(observerTargetEarth.current);
      }
    };
    const observerEarth = new IntersectionObserver(
      () => {
        setIsEarthStatic(prev => !prev);
      }, {
      threshold: 1,
      root: document,
      rootMargin: "20px",
    });
    observerEarthObserve();
    return observerEarthUnobserve;
  }, [observerTargetEarth]);

  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <div ref={observerTargetEarth}></div>
        <Image className={isEarthStatic ? "earth earth__up" : "earth"} src="/img/planeta_zemlia.jpg" alt="earth" width={400} height={620} />
        <div>{children}</div>
      </body>
    </html>
  );
}
