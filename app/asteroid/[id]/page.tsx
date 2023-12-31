'use server';
import { COMMON_ERROR, NASA_ERROR } from '@/app/assets/constants/messages';
import convertAsteroidsFull from '@/app/utils/convertAsteroidsFull';
import { planets } from '@/app/utils/planets';
import { notFound } from 'next/navigation';
import styles from './page.module.css';
import Image from 'next/image';
import { NASA_BASE_URL } from '@/app/assets/constants/urls';

async function getAsteroid(id: string): Promise<AsteroidFull | null> {
  try {
    const res = await fetch(`${NASA_BASE_URL}/neo/${id}?api_key=${process.env.API_KEY}`);
    if (!res.ok) throw new Error(NASA_ERROR);
    return res.json();
  } catch (err) {
    const message = err instanceof Error ? err.message : COMMON_ERROR;
    console.error(message);
    return null;
  }
}

export default async function AsteroidSingle({ params }: { params: { id: string; }; }) {
  const res: AsteroidFull | null = await getAsteroid(params.id);
  if (!res) {
    notFound();
  };
  const asteroid: AsteroidOnClient = convertAsteroidsFull(res);
  return (
    <div>
      <div className="content__shift">
        <h2 className='list__title' style={{ marginBottom: 0 }}>
          <span className={styles.asteroid__small}>{asteroid.size === 'small'
            && <Image src='/img/asteroid-small.png' alt='asteroids' width='22' height='24' />}</span>
          <span className={styles.asteroid__large}>{asteroid.size === 'large'
            && <Image src='/img/asteroid-large.png' alt='asteroids' width='37' height='40' />}</span>
          {asteroid.name}
        </h2>
        <div className={styles.title__description}>
          Ø {Math.floor(asteroid.estimated_diameter_max)} м.
        </div>
        <h3 className={styles.list__head}>Список сближений:</h3>
        <ul className={styles.list}>
          {asteroid.close_approach_data?.map((a) => <li key={a.miss_distance_kilometers}>
            <div className={styles.list__item__header}>
              {a.close_approach_date}
            </div>
            <div>скорость относительно 🌍 - {a.kilometers_per_hour} км/ч</div>
            <div>
              <div className={styles.list__item__measure}>
                <div>
                  {a.miss_distance_kilometers} км
                </div>
              </div>
              <span>- макс. сближение</span>
            </div>
            <div>вращается по орбите {planets[a.orbiting_body]}</div>
            {a.isDanger && <div className={styles.list__item__danger}>
              <Image src="/img/danger.png" alt="danger" width={15} height={15} /> Опасное сближение</div>}
          </li>)}
        </ul>
      </div>
    </div>
  );
}
