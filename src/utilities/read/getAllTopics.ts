import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTopics() {
  try {
    // Retrieve all topics
    const allTopics = await prisma.topics.findMany();

    // Log the retrieved topics
    console.log('All topics:', allTopics);

    return allTopics;
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);
    return [];
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

