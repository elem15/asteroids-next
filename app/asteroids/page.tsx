import Basket from '../components/Basket';
import Main from '../components/Main';
import AsteroidListServer from '../components/AsteroidListServer';

export default async function Asteroids() {
  return (
    <div>
      <h1>Asteroids</h1>
      <Basket />
      {/* <Main /> */}
      <AsteroidListServer />
    </div>
  );
}
