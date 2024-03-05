import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSourcesByTopicId(topicId: string) {
  try {
    // Retrieve all sources for the given topic ID
    const sourcesForTopic = await prisma.sources.findMany({
      where: {
        topicId: topicId,
      },
    });

    // Log the retrieved sources
    console.log(`Sources for topic ${topicId}:`, sourcesForTopic);

    return sourcesForTopic;
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);
    return [];
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
