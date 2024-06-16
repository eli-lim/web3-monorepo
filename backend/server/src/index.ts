import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import { publicProcedure, router } from './trpc.ts';
import { prisma } from './prisma.ts';
import './chain/listener.ts';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    return prisma.user.findMany();
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    return prisma.user.findUnique({
      where: {
        id: input,
      },
    });
  }),
  userCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      return prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(8888);
