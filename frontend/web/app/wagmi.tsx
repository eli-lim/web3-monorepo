'use client';
import { createConfig, http, useChainId, WagmiProvider } from 'wagmi';
import { foundry } from 'viem/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { ChainIcon, ConnectKitButton, ConnectKitProvider } from 'connectkit';

const config = createConfig({
  chains: [foundry],
  transports: {
    [foundry.id]: http('http://localhost:8545'),
  },
});

export const queryClient = new QueryClient();

export function Wagmi(props: { children: ReactNode }): ReactElement {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function WalletConnectorButton(): ReactElement {
  const chainId = useChainId();
  return (
    <div className="flex items-center gap-2">
      <ChainIcon id={chainId} />
      <ConnectKitButton />
    </div>
  );
}
