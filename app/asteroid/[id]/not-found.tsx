import { NASA_ERROR } from '@/app/assets/constants/messages';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>
        {NASA_ERROR}
      </h1>
      <h2>
        <Link href='/asteroids'>На главную</Link>
      </h2>
    </div>
  );
}
