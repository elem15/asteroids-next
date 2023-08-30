import { COMMON_ERROR, NASA_ERROR } from '@/app/assets/constants/messages';
import convertAsteroidsFull from '@/app/utils/convertAsteroidsFull';
import { planets } from '@/app/utils/planets';
import { notFound } from 'next/navigation';

async function getAsteroid(id: string): Promise<AsteroidFull | null> {
  try {
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=DEMO_KEY`);
    if (!res.ok) throw new Error(NASA_ERROR);
    return res.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : COMMON_ERROR;
    console.error(message);
    return null;
  }
}

export default async function Asteroid({ params }: { params: { id: string; }; }) {
  const res: AsteroidFull | null = await getAsteroid(params.id);
  if (!res) {
    notFound();
  };
  const asteroid: AsteroidOnClient = convertAsteroidsFull(res);
  return (
    <div>
      <h1>Астероид {asteroid.name}</h1>
      <div>
        Максимальный диаметр {Math.floor(asteroid.estimated_diameter_max)} м.
      </div>
      <h4>Список сближений:</h4>
      <ul>
        {asteroid.close_approach_data?.map((a) => <li key={a.miss_distance_kilometers}>
          <div>Скорость относительно Земли {a.kilometers_per_hour} км.</div>
          <div>Момент максимального сближения: {a.close_approach_date}</div>
          <div>Минимальная дистанция {a.miss_distance_kilometers} км.</div>
          <div>Вращается по орбите планеты {planets[a.orbiting_body]}.</div>
        </li>)}
      </ul>
    </div>
  );
}
