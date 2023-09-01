'use client';
import { useEffect, useState } from 'react';
import Asteroid from '../components/asteroid-card/AsteroidCard';
import { COMMON_ERROR } from '@/app/assets/constants/messages';
import Header from '../components/header/Header';

export default function Cart() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    async function getAsteroidsFromCart() {
      setLoading(true);
      try {
        const asteroidsInCart: AsteroidOnClient[]
          = JSON.parse(sessionStorage.getItem('asteroidsInCart') as string);

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
      <Header />
      <div className="content__shift">
        <h2 className="list__title">Заказ отправлен!</h2>
        <ul>
          {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} measure='luna' />)}
        </ul>
        {loading && <div>Loading...</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    </div>
  );
}
