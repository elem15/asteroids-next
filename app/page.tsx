'use server';
import { ASTEROIDS_PAGE_URL } from '@/app/assets/constants/urls';
import { redirect } from 'next/navigation';

export default async function Home() {
  redirect(ASTEROIDS_PAGE_URL);
}
