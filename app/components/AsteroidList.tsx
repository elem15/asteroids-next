export default function AsteroidList({ asteroids }: { asteroids: AsteroidOnClient[]; }) {
  return (
    <ul>
      {asteroids.map((item) => <li key={item.id}>
        <h3>{item.name}</h3>
        <div>
          {
            item.close_approach_date
          }
        </div>
        <div>
          {item.miss_distance_kilometers} км
        </div>
        <div>
          {Math.floor(item.estimated_diameter_max)} м
        </div>
      </li>)}
    </ul>
  );
}
