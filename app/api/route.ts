import { NextResponse } from 'next/server';

let date = '';
let asteroids: Asteroid[] = [];
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const currentDate = searchParams.get("date");
  if (currentDate) {
    date = currentDate;
    asteroids = [];
  }
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: ResponseData = await res.json();
  data['near_earth_objects'][date]?.forEach(asteroid => {
    asteroids.push(asteroid);
  });
  date = data.links.next.split('=')[1].split('&')[0];

  return NextResponse.json(asteroids);
}
