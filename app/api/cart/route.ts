import { NextResponse } from 'next/server';
import { SUCCESS_ADDED } from '@/app/assets/constants/messages';
import { readJsonDB, writeJsonDB } from '@/app/utils/jsonORM';

type Db = {
  asteroids: AsteroidOnClient[];
  asteroidsInCart: AsteroidOnClient[];
  ids: string[],
  counter: number;
};
const db: Db = {
  asteroids: [],
  asteroidsInCart: [],
  ids: [],
  counter: 0
};

export async function POST(request: Request) {
  const asteroid: AsteroidOnClient = await request.json();

  const cart = await readJsonDB('cart-DB') || { ids: db.ids, asteroids: db.asteroidsInCart };
  cart.ids.push(asteroid.id);
  cart.asteroids.push(asteroid);

  db.ids.push(asteroid.id);
  db.asteroidsInCart.push(asteroid);
  db.counter = db.ids.length;

  await writeJsonDB('cart-DB', cart);

  await writeJsonDB('cart-counter', { counter: cart.ids.length, ids: cart.ids });

  return NextResponse.json({ message: SUCCESS_ADDED });
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataType = searchParams.get("data");
  if (dataType === 'counter') {
    const data =
      await readJsonDB('cart-counter') ||
      { counter: db.counter };
    return NextResponse.json(data);
  } else {
    const cart: { asteroids: AsteroidOnClient[]; } =
      await readJsonDB('cart-DB') ||
      { asteroids: db.asteroidsInCart };
    return NextResponse.json({ counter: cart.asteroids.length, asteroids: cart.asteroids });
  }
}
