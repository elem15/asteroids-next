import { NextResponse } from 'next/server';
import convertAsteroids from '@/app/utils/convertAsteroids';

import { db } from '../db';

let prevDate = '';
let selfDateStart = '';
let selfDateEnd = '';
let nextDate = '';
const date = new Date();
const currentDate = date.toJSON().slice(0, 10);
date.setDate(date.getDate() + 1);
const tomorrow = date.toJSON().slice(0, 10);
function resetDate() {
  prevDate = currentDate;
  selfDateStart = currentDate;
  selfDateEnd = currentDate;
  nextDate = tomorrow;
}
resetDate();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const move = searchParams.get("move");
  if (!move && db.asteroids.length) {
    return NextResponse.json({ asteroidList: db.asteroids, isStart: new Date(selfDateStart) <= new Date(currentDate) });
  }
  try {
    const res =
      move === 'up' ?
        await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${prevDate}&end_date=${selfDateStart}&api_key=DEMO_KEY`)
        : await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
    const data: ResponseData = await res.json();
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const asteroids =
      move === 'up' ?
        [...data['near_earth_objects'][prevDate], ...data['near_earth_objects'][selfDateStart]]
        : [...data['near_earth_objects'][selfDateEnd], ...data['near_earth_objects'][nextDate]];

    db.asteroids = asteroids.map(convertAsteroids);

    prevDate = data.links.previous.split('=')[1].split('&')[0];
    selfDateStart = data.links.previous.split('=')[2].split('&')[0];
    selfDateEnd = data.links.next.split('=')[1].split('&')[0];
    nextDate = data.links.next.split('=')[2].split('&')[0];
  } catch (error: Error | unknown) {
    let message = 'Failed to fetch data';
    if (error instanceof Error) message = error.message;
    console.error(message);
    throw new Error(message);
  }
  return NextResponse.json({ asteroidList: db.asteroids, isStart: new Date(selfDateStart) <= new Date(currentDate) });
}

export async function DELETE() {
  resetDate();
  db.asteroids = [];
  db.cartAsteroidIds = [];
  db.asteroidsInCart = [];
  db.cartAsteroidQuantity = 0;
  return NextResponse.json({ message: 'Temporally Data Base is clear' });
}
