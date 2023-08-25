import { NextResponse } from 'next/server';

let date = new Date().toJSON().slice(0, 10);
let asteroids: Asteroid[] = [];

export async function GET() {
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

export async function DELETE() {
  date = new Date().toJSON().slice(0, 10);
  asteroids = [];
  return NextResponse.json({ message: 'Local Data Base is clear' });

}
