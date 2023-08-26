import { redirect } from 'next/navigation';
const dev = process.env.NODE_ENV !== 'production';
const server = dev ? 'http://localhost:3000' : 'https://your_deployment.server.com';

export default async function Home() {
  async function reset() {
    const response = await fetch(server + '/api/asteroids', {
      method: 'DELETE',
    });
    return response.json();
  }
  reset();
  redirect('/asteroids');
}
