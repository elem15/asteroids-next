import { NASA_ERROR } from '@/app/assets/constants/messages';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='content__shift' >
      <h2>
        {NASA_ERROR}
      </h2>
      <br />
      <h3>
        <Link href='/asteroids'>Перейти на главную</Link>
      </h3>
    </div>
  );
}
