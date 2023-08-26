import { NextResponse } from 'next/server';

const currentDate = new Date().toJSON().slice(0, 10);
let prevDate = currentDate;
let selfDateStart = currentDate;
let selfDateEnd = currentDate;
let nextDate = currentDate;
let asteroids: Asteroid[] = [];

export async function GET(request: Request) {
  var { searchParams } = new URL(request.url);
  const move = searchParams.get("move");
  console.log('move: ', move);
  console.log(prevDate, selfDateStart, selfDateEnd, nextDate);
  console.log(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
  let data: ResponseData;
  // if (!move) {
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  data = await res.json();
  if (selfDateEnd === nextDate) {
    asteroids = data['near_earth_objects'][selfDateEnd];
  } else {
    asteroids = [...data['near_earth_objects'][selfDateEnd], ...data['near_earth_objects'][nextDate]];
  }
  // } else {
  //   console.log(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);

  //   const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${selfDateEnd}&end_date=${nextDate}&api_key=DEMO_KEY`);
  //   if (!res.ok) {
  //     throw new Error('Failed to fetch data');
  //   }
  //   data = await res.json();
  //   console.log(data['near_earth_objects'][nextDate]);
  //   // asteroids = data['near_earth_objects'][nextDate];
  // }

  // var { searchParams } = new URL(data.links.prev);
  // prevDate = searchParams.get('end_date') as string;

  // var { searchParams } = new URL(data.links.self);
  // selfDateStart = searchParams.get('start_date') as string;
  // selfDateEnd = searchParams.get('end_date') as string;
  selfDateEnd = data.links.self.split('=')[2].split('&')[0];

  // var { searchParams } = new URL(data.links.next);
  // nextDate = searchParams.get('start_date') as string;
  nextDate = data.links.next.split('=')[1].split('&')[0];

  return NextResponse.json(asteroids);
}

export async function DELETE() {
  prevDate = currentDate;
  selfDateStart = currentDate;
  selfDateEnd = currentDate;
  nextDate = currentDate; asteroids = [];
  return NextResponse.json({ message: 'Local Data Base is clear' });
}
