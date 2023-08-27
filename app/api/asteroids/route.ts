import { NextResponse } from 'next/server';
import { db } from '../db';

let prevDate = '';
let selfDateStart = '';
let selfDateEnd = '';
let nextDate = '';
function resetDate() {
  const date = new Date();
  const currentDate = date.toJSON().slice(0, 10);
  prevDate = currentDate;
  selfDateStart = currentDate;
  selfDateEnd = currentDate;
  date.setDate(date.getDate() + 1);
  nextDate = date.toJSON().slice(0, 10);
}
resetDate();

export async function GET(request: Request) {
  var { searchParams } = new URL(request.url);
  const move = searchParams.get("move");
  console.log('move: ', move);

  let data: ResponseData;
  // if (!move) {
  try {
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
    data = await res.json();
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    db.asteroids = [...data['near_earth_objects'][selfDateEnd], ...data['near_earth_objects'][nextDate]];
    // } else {
    //   console.log(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);

    //   const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
    //   if (!res.ok) {
    //     throw new Error('Failed to fetch data');
    //   }
    //   data = await res.json();
    //   console.log(data['near_earth_objects'][nextDate]);
    //   // db.asteroids = data['near_earth_objects'][nextDate];
    // }

    // var { searchParams } = new URL(data.links.prev);
    // prevDate = searchParams.get('end_date') as string;

    // var { searchParams } = new URL(data.links.self);
    // selfDateStart = searchParams.get('start_date') as string;
    // selfDateEnd = searchParams.get('end_date') as string;
    selfDateEnd = data.links.next.split('=')[1].split('&')[0];

    // var { searchParams } = new URL(data.links.next);
    // nextDate = searchParams.get('start_date') as string;
    nextDate = data.links.next.split('=')[2].split('&')[0];
    console.log(data.links.next);
    console.log(prevDate, selfDateStart, selfDateEnd, nextDate);
  } catch (error: Error | unknown) {
    let message = 'Failed to fetch data';
    if (error instanceof Error) message = error.message;
    console.error(message);
    throw new Error(message);
  }
  return NextResponse.json(db.asteroids);
}

export async function DELETE() {
  resetDate();
  db.asteroids = [];
  return NextResponse.json({ message: 'Local Data Base is clear' });
}
