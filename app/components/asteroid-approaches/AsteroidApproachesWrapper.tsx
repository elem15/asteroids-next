'use client';
import { useEffect, useRef, useState } from 'react';
import Header from '../header/Header';
import Image from 'next/image';

export default function AsteroidApproachesWrapper({ children }: { children: React.ReactNode; }) {
  const [isEarthStatic, setIsEarthStatic] = useState(true);
  const observerTargetEarth = useRef(null);

  useEffect(() => {
    function observerEarthObserve() {
      if (observerTargetEarth.current) {
        observerEarth.observe(observerTargetEarth.current);
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
  }, [observerTargetEarth]);

  return (
    <div>
      <Header />
      <div ref={observerTargetEarth}></div>
      <Image className={isEarthStatic ? "earth earth__up" : "earth"} src="/img/planeta_zemlia.jpg" alt="earth" width={400} height={620} />
      <div>{children}</div>
    </div>
  );
}
