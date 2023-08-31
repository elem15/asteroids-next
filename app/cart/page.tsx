'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Asteroid from '../components/Asteroid';
import { COMMON_ERROR } from '@/app/assets/constants/messages';
import { ASTEROIDS_PAGE_URL } from '@/app/assets/constants/urls';

export default function Cart() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    async function getAsteroidsFromCart() {
      setLoading(true);
      try {
        const asteroidsInCart: AsteroidOnClient[] = JSON.parse(sessionStorage.getItem('asteroidsInCart') as string);

        setAsteroids(asteroidsInCart);
      } catch (error) {
        const message = error instanceof Error ? error.message : COMMON_ERROR;
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
