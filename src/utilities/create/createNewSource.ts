import { PrismaClient, Sources } from '@prisma/client';

// Create a new instance of the Prisma client
// npx ts-node prisma/create/createNewSource.ts
const prisma = new PrismaClient();

// Define the function
export async function createSource(topicTitle: string): Promise<Sources> {
  try {
    // Find the topic by its title
    const topic = await prisma.topics.findFirst({
      where: {
        title: topicTitle,
      },
      select: {
        id: true,
      },
    });

    // If the topic is not found, throw an error
    if (!topic) {
      throw new Error(`Topic with title ${topicTitle} not found`);
    }

    // Create the new source connected to the specified topic
    const newSource = await prisma.sources.create({
      data: {
        topic: {
          connect: {
            id: topic.id,
          },
        },
      },
    });

    // Log the newly created source
    console.log('Created new source:', newSource);

    return newSource;
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);
    throw new Error('Error creating source');
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
