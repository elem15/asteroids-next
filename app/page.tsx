'use client';
import { ASTEROIDS_API_URL, ASTEROIDS_PAGE_URL } from '@/app/assets/constants/urls';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  useEffect(() => {
    async function reset() {
      const response = await fetch(ASTEROIDS_API_URL, {
        method: 'DELETE',
      });
      return response.json();
    }
    reset();
    redirect(ASTEROIDS_PAGE_URL);
  }, []);
}
