import { declOfNum } from './deklOfNum';

export default function convertAsteroids(asteroid: Asteroid): AsteroidOnClient {
  const { id } = asteroid;
  const name = asteroid.name.split('(')[1].split(')')[0];
  const miss_distance_kilometers = asteroid.close_approach_data[0].miss_distance.kilometers.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const miss_distance_lunar = asteroid.close_approach_data[0].miss_distance.lunar.split('.')[0] + ' ' + declOfNum(+asteroid.close_approach_data[0].miss_distance.lunar.split('.')[0], ['лунная орбита', 'лунные орбиты', 'лунных орбит']);
  const estimated_diameter_max = Math.floor(asteroid.estimated_diameter.meters.estimated_diameter_max);
  const size = estimated_diameter_max > 70 ? 'large' : 'small';
  const isDanger = (size === 'large' && +asteroid.close_approach_data[0].miss_distance.kilometers < 50000000) ? true : false;
  return { id, name, miss_distance_kilometers, miss_distance_lunar, estimated_diameter_max, size, isDanger };
}
