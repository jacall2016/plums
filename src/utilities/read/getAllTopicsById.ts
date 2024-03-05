import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTopicsByCategoryId(categoryId: string) {
  try {
    // Retrieve all topics for the given category ID
    const topicsForCategory = await prisma.topics.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    // Log the retrieved topics
    console.log(`Topics for category ${categoryId}:`, topicsForCategory);

    return topicsForCategory;
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);
    return [];
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
