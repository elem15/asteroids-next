import { NextResponse } from 'next/server';
import { db } from '../db';

export async function POST(request: Request) {
  const asteroid: AsteroidOnClient = await request.json();
  db.asteroidsInCart.push(asteroid);
  db.cartAsteroidIds.push(asteroid.id);
  db.cartAsteroidQuantity = db.asteroidsInCart.length;
  return NextResponse.json({ message: 'Asteroid added to cart' });
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
export async function DELETE() {
  db.asteroidsInCart = [];
  db.cartAsteroidQuantity = 0;
  return NextResponse.json({ message: 'Temporally Cart is clear' });
}
