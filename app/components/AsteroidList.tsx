import Asteroid from './Asteroid';

type Props = {
  asteroids: AsteroidOnClient[];
  loading: boolean;
  addToCart: (asteroid: AsteroidOnClient) => Promise<void>;
};

export default function AsteroidList({ asteroids, loading, addToCart }: Props) {
  return (
    <ul>
      {asteroids.map((item) => <Asteroid key={item.id} asteroid={item} loading={loading} addToCart={addToCart} />)}
    </ul>
  );
}
