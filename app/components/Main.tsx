'use client';
import { useEffect, useRef, useState } from 'react';
import AsteroidList from './AsteroidList';
import Basket from './Basket';

export default function Main() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const observerTargetDown = useRef(null);
  const observerTargetUp = useRef(null);

  useEffect(() => {
    const observerDownUnobserve = () => {
      if (observerTargetDown.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerUp.unobserve(observerTargetUp.current);
      }
    };
    const observerUpObserve = () => {
      if (observerTargetUp.current) {
        observerUp.observe(observerTargetUp.current);
      }
    };
    async function getData(move = '') {
      observerDownUnobserve();
      observerUpUnobserve();
      setLoading(true);
      try {
        const response = !move ? await fetch('/api/asteroids') : await fetch(`/api/asteroids?move=${move}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: { asteroidList: AsteroidOnClient[], isStart: boolean; } = await response.json();
        const { asteroidList, isStart } = data;
        setAsteroids(asteroidList);
        if (!isStart) {
          observerUpObserve();
        }
        observerDownObserve();
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
      root: null,
      rootMargin: "0px",
    };
    const observerDown = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !errorMessage) {
          getData('down');
        }
      }, options
    );
    const observerUp = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !errorMessage) {
          getData('up');
          window.scrollTo({
            top: 100,
            left: 0,
            behavior: "smooth",
          });
        }
      }, options
    );
    async function firstLoading() {
      observerDownObserve();
    }
    if (!asteroids.length) firstLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerTargetDown]);
  return (
    <div>
      <div ref={observerTargetUp}></div>
      {loading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <h1>Asteroids</h1>
      {asteroids && asteroids.length > 0 && <AsteroidList asteroids={asteroids} />}
      <div ref={observerTargetDown}></div>
    </div>
  );
}
