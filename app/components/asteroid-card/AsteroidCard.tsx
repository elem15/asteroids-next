import Link from 'next/link';
import { useState } from 'react';
import styles from './AsteroidCard.module.css';
import Image from 'next/image';

type Props = {
  asteroid: AsteroidOnClient;
  loading?: boolean;
  addToCart?: (asteroid: AsteroidOnClient) => Promise<void>;
  measure: Measure;
};

export default function Asteroid({ asteroid, loading, addToCart, measure }: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <li className={styles.list__item}>
      <h4 className={styles.list__item__header}>
        {asteroid.close_approach_date}
      </h4>
      <div className={styles.list__item__content}>
        <div className={styles.list__item__measure}>
          {measure === 'km' &&
            <div>
              {asteroid.miss_distance_kilometers} км
            </div>
          }
          {measure === 'luna' &&
            <div>
              {asteroid.miss_distance_lunar}
            </div>
          }
        </div>
        <div className={styles.asteroid__small}>{asteroid.size === 'small'
          && <Image src='/img/asteroid-small.png' alt='asteroids' width='22' height='24' />}</div>
        <div className={styles.asteroid__large}>{asteroid.size === 'large'
          && <Image src='/img/asteroid-large.png' alt='asteroids' width='37' height='40' />}</div>
        <div>
          <h3 className={styles.list__item__title}><Link href={`/asteroid/${asteroid.id}`}>{asteroid.name}</Link></h3>
          <div className={styles.list__item__size}>
            Ø {Math.floor(asteroid.estimated_diameter_max)} м
          </div>
        </div>
      </div>
      <div className={styles.list__item__footer}>
        {addToCart && <>
          {asteroid.isInCart ?
            <button className={styles.list__item__button} disabled>
              В корзине
            </button>
            :
            <button className={styles.list__item__button} onClick={() => { addToCart(asteroid); setClicked(true); }} disabled={loading}>
              {clicked ? 'Загрузка' : 'Заказать'}
            </button>
          }
        </>}
        {asteroid.isDanger
          && <div className={styles.list__item__danger}>
            <Image src="/img/danger.png" alt="danger" width={15} height={15} /> Опасен</div>}
      </div>
    </li>
  );
}
