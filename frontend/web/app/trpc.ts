import { createTRPCProxyClient, httpLink } from '@trpc/client';
import type { AppRouter } from '@repo/server';
import { staticGenerationBailout } from 'next/dist/client/components/static-generation-bailout';

export class T {
  static get rpc() {
    // bail out of static generation for all pages that call the backend
    staticGenerationBailout('requestTrpc');

    return createTRPCProxyClient<AppRouter>({
      links: [
        httpLink({
          url: 'http://localhost:8888/',
          fetch: async (url, opts): Promise<any> => {
            return fetch(url, opts);
          },
        }),
      ],
    });
  }
}
