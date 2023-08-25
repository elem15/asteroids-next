'use client'
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const currentDate = useMemo(() => (new Date()).toJSON().slice(0, 10), [])
  const [date, setDate] = useState(currentDate)
  const [prevDate, setPrevDate] = useState(currentDate)
  const [nextDate, setNextDate] = useState(currentDate)
  const [asteroids, setAsteroids] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getData(date: string) {
      setLoading(true)
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=DEMO_KEY`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setNextDate(data.links.next.split('=')[1].split('&')[0])
      if (date !== currentDate) {
        setPrevDate(data.links.prev.split('=')[1].split('&')[0])        
      }
      setAsteroids(prev => ([...prev, ...data['near_earth_objects'][date]]))
      setLoading(false)
    }    
    getData(date)
  }, [date, currentDate])
  return (
    <div>
      <h1>Asteroids</h1>
      <div style={{position: 'fixed'}}>
      <button onClick={() => setDate(nextDate)}>Next</button>
      </div>
      <div>{ nextDate }</div>
      <div>{ prevDate }</div>
      <ul>
        {asteroids && asteroids.map((item) => <li key={item.id}>{item.name}</li>) }
      </ul>
    </div>
  )
}
