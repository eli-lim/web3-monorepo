import { foundry } from 'viem/chains';
import type { Address } from 'viem';

interface ContractDeployments {
  nameService: {
    address: Address;
  };
}

export const Deployments: Record<number, ContractDeployments> = {
  [foundry.id]: {
    nameService: {
      address: '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35',
    },
  },
} as const;
