import { useState } from 'react';
import Asteroid from './Asteroid';

type Props = {
  asteroids: AsteroidOnClient[];
  loading: boolean;
  addToCart: (asteroid: AsteroidOnClient) => Promise<void>;
};

export default function AsteroidList({ asteroids, loading, addToCart }: Props) {
  const [measure, setMeasure] = useState<Measure>('km');
  return (
    <>
      <div>
        <button onClick={() => setMeasure('km')} disabled={measure === 'km'}>В километрах</button>
        <button onClick={() => setMeasure('luna')} disabled={measure === 'luna'}>В лунных орбитах</button>
      </div>
      <ul>
        {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} loading={loading} addToCart={addToCart} measure={measure} />)}
      </ul>
    </>
  );
}
