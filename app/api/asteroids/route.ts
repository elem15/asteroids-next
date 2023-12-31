import {NextRequest, NextResponse} from 'next/server';
import convertAsteroids from '@/app/utils/convertAsteroids';
import {COMMON_ERROR, NASA_ERROR} from '@/app/assets/constants/messages';
import {NASA_BASE_URL} from '@/app/assets/constants/urls';

// export const dynamic = 'auto';
// export const dynamicParams = true;
// export const revalidate = false;
// export const fetchCache = 'auto';
// export const runtime = 'nodejs';
// export const preferredRegion = 'auto';
// export const maxDuration = 5;

let asteroidList: AsteroidOnClient[] = [];

let prevDate = '';
let selfDateStart = '';
let selfDateEnd = '';
let nextDate = '';
const date = new Date();
const currentDate = date.toJSON().slice(0, 10);
date.setDate(date.getDate() + 1);
const tomorrow = date.toJSON().slice(0, 10);

export async function GET(request: NextRequest) {
  const startDate = request.nextUrl.searchParams.get('start_date');
  const endDate = request.nextUrl.searchParams.get('end_date');

  if (selfDateStart === startDate && asteroidList.length) {
    return NextResponse.json({asteroidList, isStart: selfDateStart === currentDate});
  }
  try {
    const res =
      startDate && endDate ?
        await fetch(`${NASA_BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`)
        : await fetch(`${NASA_BASE_URL}/feed?start_date=${currentDate}&end_date=${tomorrow}&api_key=${process.env.API_KEY}`);

    const data: ResponseData = await res.json();
    if (!res.ok) {
      throw new Error(NASA_ERROR);
    }

    const asteroids =
      startDate && endDate ?
        [...data['near_earth_objects'][startDate], ...data['near_earth_objects'][endDate]]
        : [...data['near_earth_objects'][currentDate], ...data['near_earth_objects'][tomorrow]];

    asteroidList = asteroids.map(convertAsteroids);
    prevDate = data.links.previous.split('=')[1].split('&')[0];
    selfDateStart = data.links.previous.split('=')[2].split('&')[0];
    selfDateEnd = data.links.next.split('=')[1].split('&')[0];
    nextDate = data.links.next.split('=')[2].split('&')[0];
    return NextResponse.json({asteroidList, prevDate, selfDateStart, selfDateEnd, nextDate, isStart: selfDateStart === currentDate});
  } catch (error) {
    const message = error instanceof Error ? error.message : COMMON_ERROR;
    console.error(message);
    throw new Error(message);
  }
}
