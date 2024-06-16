import { ReactElement } from 'react';
import dynamic from 'next/dynamic';

const NoSSR = dynamic(() => import('./NameServiceRegistration'), {
  ssr: false,
});

export default async function Page(): Promise<ReactElement> {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <NoSSR />
    </div>
  );
}
