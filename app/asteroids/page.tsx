'use client';
import { useEffect, useRef, useState } from 'react';
import AsteroidList from '../components/AsteroidList';
import Link from 'next/link';
import styles from './page.module.css';

export default function Asteroids() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartCounter, setCartCounter] = useState(0);
  const observerTargetDown = useRef(null);
  const observerTargetUp = useRef(null);

  async function addToCart(asteroid: AsteroidOnClient) {
    setLoading(true);
    const res = await fetch('api/cart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asteroid),
    });
    if (!res.ok) {
      throw new Error('Filed to send data');
    }
    await getCartQuantity();
    try {
      const response = await fetch('/api/asteroids');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: { asteroidList: AsteroidOnClient[]; } = await response.json();
      const { asteroidList } = data;
      setAsteroids(asteroidList);
    } catch (error: Error | unknown) {
      let message = 'Failed to fetch data';
      if (error instanceof Error) message = error.message;
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

  async function getCartQuantity() {
    const res = await fetch('api/cart?data=counter');
    if (!res.ok) {
      throw new Error('Filed to send data');
    }
    const { counter } = await res.json();
    setCartCounter(counter);
  }
  useEffect(() => {
    getCartQuantity();
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
        const response = !move ? await fetch('/api/asteroids') : await fetch(`/api/asteroids?move=${move}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: { asteroidList: AsteroidOnClient[], isStart: boolean; } = await response.json();
        const { asteroidList, isStart } = data;
        setAsteroids(asteroidList);
        setTimeout(() => {
          if (!move && !isStart) {
            moveScreenUp();
          }
          if (!isStart) {
            setTimeout(() => { observerUpObserve(); }, 500);
          }
          observerDownObserve();
        }, 900);
      } catch (error: Error | unknown) {
        let message = 'Failed to fetch data';
        if (error instanceof Error) message = error.message;
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
        <div>{cartCounter} астероида</div>
        <Link href='/cart'>Отправить</Link>
      </div>
      {loading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <div ref={observerTargetDown}></div>
    </div>
  );
}
