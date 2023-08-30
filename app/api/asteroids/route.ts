import { NextResponse } from 'next/server';
import convertAsteroids from '@/app/utils/convertAsteroids';
import { db } from '../db';
import checkInCart from '@/app/utils/checkInCart';
import { COMMON_ERROR, DB_CLEAR, NASA_ERROR } from '@/app/assets/constants/messages';
import { NASA_BASE_URL } from '@/app/assets/constants/urls';
import { readJsonDB, writeJsonDB } from '@/app/utils/jsonORM';
import fs from 'fs';

const fsPromises = fs.promises;

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

  const cart = await readJsonDB('cart-counter') || { ids: db.ids };

  if (!move && db.asteroids.length) {
    const asteroidList = db.asteroids.map((asteroid) => checkInCart(asteroid, cart.ids));
    return NextResponse.json({ asteroidList, isStart: new Date(selfDateStart) <= new Date(currentDate) });
  }
  try {
    const res =
      move === 'up' ?
        await fetch(`${NASA_BASE_URL}/feed?start_date=${prevDate}&end_date=${selfDateStart}&api_key=DEMO_KEY`)
        : await fetch(`${NASA_BASE_URL}/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
    const data: ResponseData = await res.json();
    if (!res.ok) {
      throw new Error(NASA_ERROR);
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
  } catch (error) {
    const message = error instanceof Error ? error.message : COMMON_ERROR;
    console.error(message);
    throw new Error(message);
  }
  const asteroidList = db.asteroids.map((asteroid) => checkInCart(asteroid, cart.ids));

  return NextResponse.json({ asteroidList, isStart: new Date(selfDateStart) <= new Date(currentDate) });
}

export async function DELETE() {
  resetDate();
  db.asteroids = [];
  db.asteroidsInCart = [];
  db.counter = 0;
  db.ids = [];
  try {
    await fsPromises.stat('/tmp');
  } catch (error) {
    return NextResponse.json({ message: DB_CLEAR });
  }

  await writeJsonDB('cart-DB', { ids: [], asteroids: [] });

  await writeJsonDB('cart-counter', { counter: 0, ids: [] });

  return NextResponse.json({ message: DB_CLEAR });
}
