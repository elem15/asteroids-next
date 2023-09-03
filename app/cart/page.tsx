'use client';
import { useEffect, useRef, useState } from 'react';
import Asteroid from '../components/asteroid-card/AsteroidCard';
import { COMMON_ERROR } from '@/app/assets/constants/messages';
import Header from '../components/header/Header';
import Image from 'next/image';

export default function Cart() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEarthStatic, setIsEarthStatic] = useState(true);
  const observerTargetEarth = useRef(null);

  useEffect(() => {
    async function getAsteroidsFromCart() {
      setLoading(true);
      try {
        const asteroidsInCart: AsteroidOnClient[]
          = JSON.parse(sessionStorage.getItem('asteroidsInCart') as string);

        setAsteroids(asteroidsInCart);
        setErrorMessage('');
      } catch (error) {
        const message = error instanceof Error ? error.message : COMMON_ERROR;
        setErrorMessage(message);
      }
      setLoading(false);
    }
    getAsteroidsFromCart();
  }, []);

  useEffect(() => {
    function observerEarthObserve() {
      if (observerTargetEarth.current) {
        observerEarth.observe(observerTargetEarth.current);
      }
    };
    const observerEarth = new IntersectionObserver(
      () => {
        setIsEarthStatic(prev => !prev);
        setTimeout(() => {
          observerEarthObserve();
        }, 300);
      }, {
      threshold: 1,
      root: document,
      rootMargin: "20px",
    }
    );
    observerEarthObserve();
  }, [observerTargetEarth]);
  return (
    <div>
      <Header />
      <div ref={observerTargetEarth}></div>
      <Image className={isEarthStatic ? "earth earth__up" : "earth"} src="/img/planeta_zemlia.jpg" alt="earth" width={400} height={620} />
      <div className="content__shift">
        {loading && <Image className="spinner" src="/img/Spinner.png" alt="spinner" width={16} height={16} />}
        <h2 className="list__title">Заказ отправлен!</h2>
        <ul>
          {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} measure='luna' />)}
        </ul>
        {errorMessage && <div className="error__message">{errorMessage}</div>}
      </div>
    </div>
  );
}
