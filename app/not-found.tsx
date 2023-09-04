import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>
        Астероид не найден в базе
      </h2>
      <Link href='/asteroids'>На главную</Link>
    </div>
  );
}
