/**
 * Adds seed data to dev db
 * @see https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const firstUserId = '5c03994c-fc16-47e0-bd02-d218a370a077';
  await prisma.user.upsert({
    where: {
      id: firstUserId,
    },
    create: {
      id: firstUserId,
      name: 'First User',
      email: 'jolene@sneil.dev',
    },
    update: {},
  });

  const firstPostId = '5c03994c-fc16-47e0-bd02-d218a370a078';
  await prisma.post.upsert({
    where: {
      id: firstPostId,
    },
    create: {
      id: firstPostId,
      title: 'First Post',
      authorId: firstUserId,
    },
    update: {},
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
