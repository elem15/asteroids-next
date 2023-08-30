import { NextResponse } from 'next/server';
import { SUCCESS_ADDED } from '@/app/assets/constants/messages';
import { readJsonDB, writeJsonDB } from '@/app/utils/jsonORM';

export async function POST(request: Request) {
  const asteroid: AsteroidOnClient = await request.json();

  const cart: { ids: string[], asteroids: AsteroidOnClient[]; } = await readJsonDB('cart-DB') || { ids: [], asteroids: [] };
  cart.ids.push(asteroid.id);
  cart.asteroids.push(asteroid);
  await writeJsonDB('cart-DB', cart);

  await writeJsonDB('cart-counter', { counter: cart.ids.length, ids: cart.ids });

  return NextResponse.json({ message: SUCCESS_ADDED });
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataType = searchParams.get("data");
  if (dataType === 'counter') {
    const data = await readJsonDB('cart-counter') || { counter: 0 };
    return NextResponse.json(data);
  } else {
    const cart: { asteroids: AsteroidOnClient[]; } = await readJsonDB('cart-DB') || { ids: [], asteroids: [] };
    return NextResponse.json({ counter: cart.asteroids.length, asteroids: cart.asteroids });
  }
}
