'use client';
import { useEffect, useRef, useState } from 'react';
import AsteroidList from './AsteroidList';

export default function Main() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const observerTarget = useRef(null);

  useEffect(() => {
    const observerUnobserve = () => {
      if (observerTarget.current) {
        console.log('uNobserve');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
    const observerObserve = () => {
      if (observerTarget.current) {
        console.log('observe');
        observer.observe(observerTarget.current);
      }
    };
    async function getData(move = '') {
      observerUnobserve();
      setLoading(true);
      try {
        const response = !move ? await fetch('/api/asteroids') : await fetch(`/api/asteroids?move=${move}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Asteroid[] = await response.json();
        setAsteroids(data);
        setLoading(false);
        observerObserve();
      } catch (error: Error | unknown) {
        let message = 'Failed to fetch data';
        if (error instanceof Error) message = error.message;
        setErrorMessage(message);
      }
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !errorMessage) {
          getData('down');
        }
      },
      {
        threshold: 0,
        root: null,
        rootMargin: "20px",
      }
    );
    if (!asteroids.length && !errorMessage) {
      getData();
    }
    observerObserve();
    // return observerUnobserve;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerTarget]);
  return (
    <div>
      {asteroids && asteroids.length > 0 && <AsteroidList asteroids={asteroids} />}
      {loading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
      <div ref={observerTarget}></div>
    </div>
  );
}
