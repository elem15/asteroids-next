export default function AsteroidList({ asteroids }: { asteroids: Asteroid[]; }) {
  return (
    <ul>
      {asteroids.map((item) => <li key={item.id}>
        <h3>{item.name.split('(')[1].split(')')[0]}</h3>
        <div>
          {
            new Date(item.close_approach_data[0].close_approach_date)
              .toLocaleString("ru", {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).replace('.', '').replace('г.', '')
          }
        </div>
        <div>
          {item.close_approach_data[0].miss_distance.kilometers.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")} км
        </div>
        <div>
          {Math.floor(item.estimated_diameter.meters.estimated_diameter_max)} м
        </div>
      </li>)}
    </ul>
  );
}
