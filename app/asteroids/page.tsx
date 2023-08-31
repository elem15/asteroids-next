'use client';
import { useEffect, useRef, useState } from 'react';
import AsteroidList from '../components/AsteroidList';
import Link from 'next/link';
import styles from './page.module.css';
import { COMMON_ERROR, NASA_ERROR } from '@/app/assets/constants/messages';
import { ASTEROIDS_API_URL, CART_PAGE_URL } from '@/app/assets/constants/urls';
import { declOfNum } from '../utils/deklOfNum';
import checkInCart from '../utils/checkInCart';

export default function Asteroids() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartCounter, setCartCounter] = useState(0);
  const observerTargetDown = useRef(null);
  const observerTargetUp = useRef(null);

  async function addToCart(asteroid: AsteroidOnClient) {
    setLoading(true);
    try {
      const asteroidsInCart: AsteroidOnClient[] = JSON.parse(sessionStorage.getItem('asteroidsInCart') as string);
      asteroidsInCart.push(asteroid);
      sessionStorage.setItem('asteroidsInCart', JSON.stringify(asteroidsInCart));

      const ids: string[] = JSON.parse(sessionStorage.getItem('ids') as string);
      ids.push(asteroid.id);
      sessionStorage.setItem('ids', JSON.stringify(ids));

      sessionStorage.setItem('counter', ids.length + '');
    } catch (error) {
      const message = error instanceof Error ? error.message : COMMON_ERROR;
      setErrorMessage(message);
    }
    getCartQuantity();
    try {
      const response = await fetch(ASTEROIDS_API_URL);
      if (!response.ok) {
        throw new Error(NASA_ERROR);
      }
      const data: { asteroidList: AsteroidOnClient[]; } = await response.json();
      const { asteroidList } = data;
      const ids: string[] = JSON.parse(sessionStorage.getItem('ids') as string);
      const asteroids = asteroidList.map((asteroid) => checkInCart(asteroid, ids));
      setAsteroids(asteroids);
    } catch (error) {
      const message = error instanceof Error ? error.message : COMMON_ERROR;
      setErrorMessage(message);
    }
    setLoading(false);
  }

  function moveScreenUp() {
    window.scrollTo({
      top: 50,
      left: 0,
      behavior: "smooth",
    });
  }

  function getCartQuantity() {
    try {
      const counter = sessionStorage.getItem('counter');
      counter && setCartCounter(+counter);
    } catch (error) {
      const message = error instanceof Error ? error.message : COMMON_ERROR;
      setErrorMessage(message);
    }
  }

  useEffect(() => {
    !sessionStorage.getItem('counter') && sessionStorage.setItem('counter', '0');
    !sessionStorage.getItem('ids') && sessionStorage.setItem('ids', JSON.stringify([]));
    !sessionStorage.getItem('asteroidsInCart') && sessionStorage.setItem('asteroidsInCart', JSON.stringify([]));
  }, []);

  useEffect(() => {
    const observerDownUnobserve = () => {
      if (observerTargetDown.current) {
        observerDown.unobserve(observerTargetDown.current);
      }
    };
    const observerDownObserve = () => {
      if (observerTargetDown.current) {
        observerDown.observe(observerTargetDown.current);
      }
    };
    const observerUpUnobserve = () => {
      if (observerTargetUp.current) {
        observerUp.unobserve(observerTargetUp.current);
      }
    };
    const observerUpObserve = () => {
      if (observerTargetUp.current) {
        observerUp.observe(observerTargetUp.current);
      }
    };
    async function getData(move = '') {
      setLoading(true);
      try {
        const response = !move ? await fetch(ASTEROIDS_API_URL) : await fetch(`${ASTEROIDS_API_URL}?move=${move}`);
        if (!response.ok) {
          throw new Error(NASA_ERROR);
        }
        const data: { asteroidList: AsteroidOnClient[], isStart: boolean; } = await response.json();
        const { asteroidList, isStart } = data;

        const ids: string[] = JSON.parse(sessionStorage.getItem('ids') as string);
        const counter = sessionStorage.getItem('counter') as string;

        const asteroids = asteroidList.map((asteroid) => checkInCart(asteroid, ids));

        setCartCounter(+counter);
        setAsteroids(asteroids);

        setTimeout(() => {
          if (!move && !isStart) {
            moveScreenUp();
          }
          if (!isStart) {
            setTimeout(() => { observerUpObserve(); }, 500);
          }
          observerDownObserve();
        }, 900);

      } catch (error) {
        const message = error instanceof Error ? error.message : COMMON_ERROR;
        setErrorMessage(message);
      } finally {
        setLoading(false);
      }
    }
    const options = {
      threshold: 1,
      root: document,
      rootMargin: "20px",
    };
    const observerDown = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !errorMessage) {
          observerDownUnobserve();
          getData('down');
        }
      }, options
    );
    const observerUp = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !errorMessage) {
          observerUpUnobserve();
          moveScreenUp();
          getData('up');
        }
      }, options
    );
    async function firstLoading() {
      await getData();
    }
    if (!asteroids.length) firstLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerTargetDown]);
  return (
    <div>
      <div ref={observerTargetUp}></div>
      {errorMessage && <div>{errorMessage}</div>}
      <h1>Asteroids</h1>
      {asteroids && asteroids.length > 0 && <AsteroidList asteroids={asteroids} loading={loading} addToCart={addToCart} />}
      <div className={styles.cart}>
        <h4>Корзина</h4>
        {!loading && <>
          {cartCounter > 0 ?
            <>
              <div>{cartCounter} {declOfNum(cartCounter, ['астероид', 'астероида', 'астероидов'])}</div>
              <Link href={CART_PAGE_URL}>Отправить</Link>
            </>
            : <div>Миссии не заказаны</div>
          }
        </>}
      </div>
      {loading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <div ref={observerTargetDown}></div>
    </div>
  );
}
