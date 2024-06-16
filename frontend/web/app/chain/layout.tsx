import type { ReactElement, ReactNode } from 'react';
import { Wagmi, WalletConnectorButton } from '../wagmi';
import { Header } from './header';

export default async function Layout(props: {
  children: ReactNode;
}): Promise<ReactElement> {
  return (
    <div className="min-h-screen">
      <Wagmi>
        <Header />

        <div className="">{props.children}</div>
        {/* Footer */}
        <footer></footer>
      </Wagmi>
    </div>
  );
}
