import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function deleteSourceById(sourceId: string) {
  try {
    // Delete the source by its ID
    const deletedSource = await prisma.sources.delete({
      where: {
        id: sourceId,
      },
    });

    // Log the deleted source
    console.log('Deleted source:', deletedSource);
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error:', error);
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}


deleteSourceById('source_id_here');