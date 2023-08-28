import { useEffect, useState } from 'react';

type Props = {
  asteroid: AsteroidOnClient;
  loading?: boolean;
  addToCart?: (asteroid: AsteroidOnClient) => Promise<void>;
};
export default function Asteroid({ asteroid, loading, addToCart }: Props) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (!loading) {
      setClicked(false);
    }
  }, [loading]);

  return (
    <li key={asteroid.id}>
      <h3>{asteroid.name}</h3>
      <div>
        {
          asteroid.close_approach_date
        }
      </div>
      <div>{asteroid.size}</div>
      <div>
        {asteroid.miss_distance_kilometers} км
      </div>
      <div>
        {Math.floor(asteroid.estimated_diameter_max)} м
      </div>
      <div>{asteroid.isDanger && 'опасен!'}</div>
      {addToCart && <>
        {asteroid.isInCart ?
          <button disabled>
            В корзине
          </button>
          :
          <button onClick={() => { addToCart(asteroid); setClicked(true); }}>
            {clicked ? 'Загрузка' : 'Заказать'}
          </button>
        }
      </>}
    </li>);
}
