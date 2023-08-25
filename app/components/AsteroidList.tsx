export default function AsteroidList({ asteroids }: { asteroids: Asteroid[]; }) {
  return (
    <ul>
      {asteroids && asteroids.map((item) => <li key={item.id}>
        <h1>{item.name.split('(')[1].split(')')[0]}</h1>
        <div>
          {item.close_approach_data[0].close_approach_date_full}
        </div>
        <div>
          {item.close_approach_data[0].miss_distance.kilometers.split('.')[0]}km
        </div>
        <div>
          {Math.floor(item.estimated_diameter.meters.estimated_diameter_max)}m
        </div>
      </li>)}
    </ul>
  );
}
