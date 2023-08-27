import { NextResponse } from 'next/server';
import { db } from '../db';
import convertAsteroids from '@/app/utils/convertAsteroids';

let prevDate = '';
let selfDateStart = '';
let selfDateEnd = '';
let nextDate = '';
const date = new Date();
const currentDate = date.toJSON().slice(0, 10);
function resetDate() {
  prevDate = currentDate;
  selfDateStart = currentDate;
  selfDateEnd = currentDate;
  date.setDate(date.getDate() + 1);
  nextDate = date.toJSON().slice(0, 10);
}
resetDate();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const move = searchParams.get("move");

  let data: ResponseData;
  try {
    const res =
      move === 'up' ?
        await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${prevDate}&end_date=${selfDateStart}&api_key=DEMO_KEY`)
        : await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
    data = await res.json();
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    db.asteroids =
      move === 'up' ?
        [...data['near_earth_objects'][prevDate], ...data['near_earth_objects'][selfDateStart]]
        : [...data['near_earth_objects'][selfDateEnd], ...data['near_earth_objects'][nextDate]];

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
  const asteroidList = db.asteroids.map(convertAsteroids);
  return NextResponse.json({ asteroidList, isStart: new Date(selfDateStart) <= new Date(currentDate) });
}

export async function DELETE() {
  resetDate();
  db.asteroids = [];
  return NextResponse.json({ message: 'Temporally Data Base is clear' });
}
