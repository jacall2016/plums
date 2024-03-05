import { PrismaClient, Topics } from '@prisma/client';

// Create a new instance of the Prisma client
const prisma = new PrismaClient();

// Define the function
export async function createTopic(): Promise<Topics> {
  try {
    // Get the 'Science' category
    const scienceCategory = await prisma.categories.findFirst({
      where: {
        name: 'Science',
      },
    });

    // If the 'Science' category is not found, throw an error
    if (!scienceCategory) {
      throw new Error('Science category not found!');
    }

    // Create a new topic connected to the 'Science' category
    const newTopic = await prisma.topics.create({
      data: {
        title: 'New Topic Title',
        description: 'This is the description of the new topic',
        category: {
          connect: {
            id: scienceCategory.id,
          },
        },
      },
    });

    // Log the newly created topic
    console.log('Created new topic:', newTopic);

    return newTopic;
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);
    throw new Error('Error creating topic');
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

// Call the function to create a new topic
createTopic();
