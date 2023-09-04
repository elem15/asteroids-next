'use client';
import { useEffect, useRef, useState } from 'react';
import AsteroidList from '../components/asteroid-list/AsteroidList';
import { COMMON_ERROR, NASA_ERROR } from '@/app/assets/constants/messages';
import { ASTEROIDS_API_URL } from '@/app/assets/constants/urls';
import checkInCart from '../utils/checkInCart';
import Header from '../components/header/Header';
import CartWidget from '../components/cart-widget/CartWidget';
import Image from 'next/image';

export default function Asteroids() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartCounter, setCartCounter] = useState(0);
  const [isEarthStatic, setIsEarthStatic] = useState(true);
  const observerTargetDown = useRef(null);
  const observerTargetUp = useRef(null);
  const observerTargetEarth = useRef(null);

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
      setErrorMessage('');
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
    function observerDownUnobserve() {
      if (observerTargetDown.current) {
        observerDown.unobserve(observerTargetDown.current);
      }
    };
    function observerDownObserve() {
      if (observerTargetDown.current) {
        observerDown.observe(observerTargetDown.current);
      }
    };
    function observerUpUnobserve() {
      if (observerTargetUp.current) {
        observerUp.unobserve(observerTargetUp.current);
      }
    };
    function observerUpObserve() {
      if (observerTargetUp.current) {
        observerUp.observe(observerTargetUp.current);
      }
    };

    function observerEarthObserve() {
      if (observerTargetEarth.current) {
        observerEarth.observe(observerTargetEarth.current);
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
        setErrorMessage('');

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

    const observerEarth = new IntersectionObserver(
      () => {
        setIsEarthStatic(prev => !prev);
      }, options
    );

    async function firstLoading() {
      await getData();
    }
    if (!asteroids.length) firstLoading();
    observerEarthObserve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerTargetDown, observerTargetEarth]);
  return (
    <div>
      <div ref={observerTargetUp}></div>
      {errorMessage && <div className="error__message">{errorMessage}</div>}
      <Header />
      <div ref={observerTargetEarth}></div>
      <Image className={isEarthStatic ? "earth earth__up" : "earth"} src="/img/planeta_zemlia.jpg" alt="earth" width={400} height={620} />
      <div>
        {loading && asteroids.length === 0 && <Image className="spinner content__shift" src="/img/Spinner.png" alt="spinner" width={16} height={16} />}
        {asteroids && asteroids.length > 0 && <AsteroidList asteroids={asteroids} loading={loading} addToCart={addToCart} />}
        {errorMessage && <div className="error__message">{errorMessage}</div>}
      </div>
      <CartWidget loading={loading} cartCounter={cartCounter} />
      <div ref={observerTargetDown}></div>
    </div>
  );
}
