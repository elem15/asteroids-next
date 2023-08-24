import styles from './page.module.css'


export default async function Home() {
  const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-08-24&api_key=DEMO_KEY')
  const data = await response.json()
  return (
    <div>
      <h1>Asteroids</h1>
      <ul>
        {data['near_earth_objects']['2023-08-29'].map((item) => <li key={item.id}>{item.name}</li>) }
      </ul>
    </div>
  )
}
