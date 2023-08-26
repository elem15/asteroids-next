'use client';
import { useEffect, useRef, useState } from 'react';
import AsteroidList from './AsteroidList';

export default function Main() {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    async function getData(move = '') {
      console.log('down: ', move);

      setLoading(true);
      const response = !move ? await fetch('/api/asteroids') : await fetch(`/api/asteroids?move=${move}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Asteroid[] = await response.json();
      setAsteroids(data);
      setLoading(false);
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && asteroids.length > 0) {
          getData('down');
        }
      },
      {
        threshold: 0,
        root: null,
        rootMargin: "20px",
      }
    );
    if (!asteroids.length) {
      getData();
    }
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [asteroids.length, observerTarget]);
  return (
    <div>
      <AsteroidList asteroids={asteroids} />
      {loading && <div>Loading...</div>}
      <div ref={observerTarget}></div>
    </div>
  );
}
