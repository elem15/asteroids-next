'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import AsteroidList from './AsteroidList';

export default function Main() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);
  // useEffect(() => {
  //   async function reset() {
  //     await fetch('/api/asteroids', {
  //       method: 'DELETE',
  //     });
  //   }
  //   reset();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch('/api/asteroids');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Asteroid[] = await response.json();
      setAsteroids(data);
      setLoading(false);
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          getData();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  return (
    <div>
      <AsteroidList asteroids={asteroids} />
      {loading && <div>Loading...</div>}
      <div ref={observerTarget}></div>
    </div>
  );
}
