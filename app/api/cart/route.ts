import { NextResponse } from 'next/server';
import { db } from '../db';
import { SUCCESS_ADDED } from '@/assets/constants/messages';

export async function POST(request: Request) {
  const asteroid: AsteroidOnClient = await request.json();
  db.asteroidsInCart.push(asteroid);
  db.cartAsteroidIds.push(asteroid.id);
  db.cartAsteroidQuantity = db.asteroidsInCart.length;
  return NextResponse.json({ message: SUCCESS_ADDED });
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataType = searchParams.get("data");
  if (dataType === 'counter') {
    return NextResponse.json({ counter: db.cartAsteroidQuantity });
  } else {
    return NextResponse.json({ counter: db.cartAsteroidQuantity, asteroids: db.asteroidsInCart });
  }
}
