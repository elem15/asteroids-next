export default function convertAsteroids(asteroid: Asteroid): AsteroidOnClient {
  const { id } = asteroid;
  const name = asteroid.name.split('(')[1].split(')')[0];
  const close_approach_date = new Date(asteroid.close_approach_data[0].close_approach_date).toLocaleString("ru", {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).replace('.', '').replace('г.', '');
  const miss_distance_kilometers = asteroid.close_approach_data[0].miss_distance.kilometers.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const miss_distance_lunar = asteroid.close_approach_data[0].miss_distance.lunar.split('.')[0];
  const estimated_diameter_max = Math.floor(asteroid.estimated_diameter.meters.estimated_diameter_max);
  const size = estimated_diameter_max > 70 ? 'large' : 'small';
  const isDanger = (size === 'large' && +asteroid.close_approach_data[0].miss_distance.kilometers < 50000000) ? true : false;
  return { id, name, close_approach_date, miss_distance_kilometers, miss_distance_lunar, estimated_diameter_max, size, isDanger };
}
