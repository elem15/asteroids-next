import AsteroidApproaches from '@/app/components/asteroid-approaches/AsteroidApproaches';
import AsteroidApproachesWrapper from '@/app/components/asteroid-approaches/AsteroidApproachesWrapper';

export default function asteroid({ params }: { params: { id: string; }; }) {

  return (
    <div>
      <AsteroidApproachesWrapper><AsteroidApproaches id={params.id} /></AsteroidApproachesWrapper>
    </div>
  );
}
