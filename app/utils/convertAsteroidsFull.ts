import { convertDateFull } from './convertDate';
import convertKilometers from './convertKilometers';

export default function convertAsteroidsFull(asteroid: AsteroidFull): AsteroidOnClient {
  const { id } = asteroid;
  const name = asteroid.name.split('(')[1].split(')')[0];
  const miss_distance_kilometers = convertKilometers(asteroid.close_approach_data[0].miss_distance.kilometers);
  const miss_distance_lunar = asteroid.close_approach_data[0].miss_distance.lunar.split('.')[0];
  const estimated_diameter_max = Math.floor(asteroid.estimated_diameter.meters.estimated_diameter_max);
  const size = estimated_diameter_max > 70 ? 'large' : 'small';
  const isDanger = (size === 'large' && +asteroid.close_approach_data[0].miss_distance.kilometers < 50000000) ? true : false;
  const close_approach_data = asteroid.close_approach_data.map((a): ApproachOnClient => ({
    kilometers_per_hour: convertKilometers(a.relative_velocity.kilometers_per_hour),
    close_approach_date: convertDateFull(a.close_approach_date),
    miss_distance_kilometers: convertKilometers(a.miss_distance.kilometers),
    orbiting_body: a.orbiting_body
  }));
  return { id, name, miss_distance_kilometers, miss_distance_lunar, estimated_diameter_max, size, isDanger, close_approach_data };
}
