import { createConfig } from 'wagmi';
import { foundry } from 'viem/chains';
import { http } from 'viem';

export const config = createConfig({
  chains: [foundry],
  transports: {
    [foundry.id]: http('http://localhost:8545'),
  },
});
