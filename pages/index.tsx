import { useRouter } from 'next/router';
import { Welcome } from '../components/molecules/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
    </>
  );
}
