import { ReactElement } from 'react';
import Link from 'next/link';
import { WalletConnectorButton } from '../wagmi';

export function Header(): ReactElement {
  return (
    <nav className="flex h-full items-center justify-between mt-2 mx-2">
      <Link
        href="/"
        aria-label="Home"
        className="-m-2 shrink-0 items-center p-2 transition duration-300 hover:opacity-60 text-sm text-mono-400 font-semibold outline-none"
      >
        home
      </Link>

      <WalletConnectorButton />
    </nav>
  );
}
