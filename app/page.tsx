'use server';
import { ASTEROIDS_PAGE_URL } from '@/app/assets/constants/urls';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Armageddon',
    description: 'Save the planet from asteroids',
  };
}

export default async function Home() {
  redirect(ASTEROIDS_PAGE_URL);
}
