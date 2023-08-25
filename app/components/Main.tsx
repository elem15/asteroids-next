'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import AsteroidList from './AsteroidList';

export default function Main() {
  const currentDate = useMemo(() => (new Date()).toJSON().slice(0, 10), []);
  const [date, setDate] = useState(currentDate);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    async function getData(date: string) {
      setLoading(true);
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: ResponseData = await response.json();
      setDate(data.links.next.split('=')[1].split('&')[0]);
      setAsteroids(prev => ([...prev, ...data['near_earth_objects'][date]]));
      setLoading(false);
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          getData(date);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [date, observerTarget]);
  return (
    <div>
      <AsteroidList asteroids={asteroids} />
      {loading && <div>Loading...</div>}
      <div ref={observerTarget}></div>
    </div>
  );
}
