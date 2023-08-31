import { useState } from 'react';
import Asteroid from '../asteroid-card/AsteroidCard';
import styles from './AsteroidList.module.css';
type Props = {
  asteroids: AsteroidOnClient[];
  loading: boolean;
  addToCart: (asteroid: AsteroidOnClient) => Promise<void>;
};

export default function AsteroidList({ asteroids, loading, addToCart }: Props) {
  const [measure, setMeasure] = useState<Measure>('km');
  return (
    <>
      <div className={styles.list__head}>
        <h2 className={styles.list__title}>Ближайшие подлёты астероидов</h2>
        <div className={styles.list__toggler}>
          <button className={styles.list__toggler__button} onClick={() => setMeasure('km')}
            disabled={measure === 'km'}>В километрах</button>{' '}|{' '}
          <button className={styles.list__toggler__button} onClick={() => setMeasure('luna')}
            disabled={measure === 'luna'}>В лунных орбитах</button>
        </div>
      </div>

      <ul className={styles.list}>
        {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} loading={loading} addToCart={addToCart} measure={measure} />)}
      </ul>
    </>
  );
}
