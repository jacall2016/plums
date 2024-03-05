import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function deleteTopicById(topicId: string) {
  try {
    // Delete the topic by its ID
    const deletedTopic = await prisma.topics.delete({
      where: {
        id: topicId,
      },
    });

    // Log the deleted topic
    console.log('Deleted topic:', deletedTopic);
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error:', error);
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}



deleteTopicById('topic_id_here');
