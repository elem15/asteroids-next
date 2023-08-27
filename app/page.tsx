'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    async function reset() {
      const response = await fetch('/api/asteroids', {
        method: 'DELETE',
      });
      return response.json();
    }
    reset();
    redirect('/asteroids');
  }, []);
}
