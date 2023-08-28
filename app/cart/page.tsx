'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Cart() {
  const [asteroids, setAsteroids] = useState<AsteroidOnClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    async function getAsteroidsFromCart() {
      setLoading(true);
      const res = await fetch('api/cart?data=asteroids');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const { asteroids } = await res.json();
      setAsteroids(asteroids);
      setLoading(true);
    }
    getAsteroidsFromCart();
  }, []); return (
    <div>
      <h1>Заказ отправлен!</h1>
      <Link href='/asteroids'>Asteroids</Link>
      <ul>
        {asteroids.map((item) => <li key={item.id}>
          <h3>{item.name}</h3>
          <div>
            {
              item.close_approach_date
            }
          </div>
          <div>
            {item.miss_distance_kilometers} км
          </div>
          <div>
            {Math.floor(item.estimated_diameter_max)} м
          </div>
        </li>)}
      </ul>
    </div>
  );
}
