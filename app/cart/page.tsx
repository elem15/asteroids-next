'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Asteroid from '../components/Asteroid';
import { CART_COUNT_ERROR, COMMON_ERROR } from '@/app/assets/constants/messages';
import { ASTEROIDS_PAGE_URL } from '@/app/assets/constants/urls';

export default function Cart() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    async function getAsteroidsFromCart() {
      setLoading(true);
      try {
        const res = await fetch('api/cart?data=asteroids');
        if (!res.ok) {
          throw new Error(CART_COUNT_ERROR);
        }
        const { asteroids } = await res.json();
        setAsteroids(asteroids);
      } catch (error: Error | unknown) {
        let message = COMMON_ERROR;
        if (error instanceof Error) message = error.message;
        setErrorMessage(message);
      }
      setLoading(false);
    }
    getAsteroidsFromCart();
  }, []);
  return (
    <div>
      <h1>Заказ отправлен!</h1>
      <Link href={ASTEROIDS_PAGE_URL}>Asteroids</Link>
      <ul>
        {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} measure='luna' />)}
      </ul>
      {loading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}
