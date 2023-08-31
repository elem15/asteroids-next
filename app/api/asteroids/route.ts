import { NextResponse } from 'next/server';
import convertAsteroids from '@/app/utils/convertAsteroids';
import { COMMON_ERROR, DB_CLEAR, NASA_ERROR } from '@/app/assets/constants/messages';
import { NASA_BASE_URL } from '@/app/assets/constants/urls';

let asteroidList: AsteroidOnClient[] = [];

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
  asteroidList = [];
}
resetDate();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const move = searchParams.get("move");

  if (!move && asteroidList.length) {
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

    asteroidList = asteroids.map(convertAsteroids);
    prevDate = data.links.previous.split('=')[1].split('&')[0];
    selfDateStart = data.links.previous.split('=')[2].split('&')[0];
    selfDateEnd = data.links.next.split('=')[1].split('&')[0];
    nextDate = data.links.next.split('=')[2].split('&')[0];
    return NextResponse.json({ asteroidList, isStart: new Date(selfDateStart) <= new Date(currentDate) });
  } catch (error) {
    const message = error instanceof Error ? error.message : COMMON_ERROR;
    console.error(message);
    throw new Error(message);
  }
}

export async function DELETE() {
  resetDate();

  return NextResponse.json({ message: DB_CLEAR });
}
