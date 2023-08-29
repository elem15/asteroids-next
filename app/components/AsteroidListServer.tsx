const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

async function getData() {
  const res = await fetch(server + ASTEROIDS_API_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function AsteroidList() {
  const asteroids: Asteroid[] = await getData();
  return (
    <ul>
      {asteroids?.length && asteroids.map((item) => <li key={item.id}>
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
