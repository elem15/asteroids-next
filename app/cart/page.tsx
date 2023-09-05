'use client';
import { useEffect, useState } from 'react';
import Asteroid from '../components/asteroid-card/AsteroidCard';
import { COMMON_ERROR } from '@/app/assets/constants/messages';
import Image from 'next/image';
import styles from './page.module.css';


export default function Cart({ params }: { params: { id: string; }; }) {
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
        setErrorMessage('');
      } catch (error) {
        const message = error instanceof Error ? error.message : COMMON_ERROR;
        setErrorMessage(message);
      }
      setLoading(false);
    }
    getAsteroidsFromCart();
  }, []);

  return (
    <>
      <div className="content__shift">
        {loading && <Image className="spinner" src="/img/Spinner.png" alt="spinner" width={16} height={16} />}
        <h3>{params.id}</h3>
        <h2 className="list__title">Заказ отправлен!</h2>
        <ul>
          {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} measure='luna' />)}
        </ul>
        {errorMessage && <div className="error__message">{errorMessage}</div>}
      </div>
      <div className={styles.cart__footer}>© Все права и планета защищены</div>
    </>
  );
}
