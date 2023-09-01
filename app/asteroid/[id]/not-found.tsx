import { NASA_ERROR } from '@/app/assets/constants/messages';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>
        {NASA_ERROR}
        <br />
        Астероид не найден в базе
      </h1>
      <h2>
        <Link href='/asteroids'>На главную</Link>
      </h2>
    </div>
  );
}
