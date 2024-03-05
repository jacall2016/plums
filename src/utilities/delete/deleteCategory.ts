import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function deleteCategoryById(categoryId: string) {
  try {
    // Delete the category by its ID
    const deletedCategory = await prisma.categories.delete({
      where: {
        id: categoryId,
      },
    });

    // Log the deleted category
    console.log('Deleted category:', deletedCategory);
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error:', error);
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}


deleteCategoryById('category_id_here');
