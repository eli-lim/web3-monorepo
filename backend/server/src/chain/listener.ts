import { Deployments } from '@repo/contracts-deployments';
import { watchNameServiceRegisteredEvent } from '@repo/contracts-nodejs';
import { config } from './config.ts';
import { foundry } from 'viem/chains';

/**
 * Watch for the NameServiceRegistered event on the foundry chain.
 * This allows the server to act on some on-chain event.
 */
watchNameServiceRegisteredEvent(config, {
  address: Deployments[foundry.id]!.nameService.address,
  onLogs: async (logs) => {
    console.log('NameServiceRegistered event', logs);
  },
});
