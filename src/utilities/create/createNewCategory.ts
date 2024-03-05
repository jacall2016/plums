// import { PrismaClient, Categories } from '@prisma/client';
const { PrismaClient, Categories } = require('@prisma/client');

// Create a new instance of the Prisma client
// npx ts-node prisma/utilities/create/createNewCategory.ts
const prisma = new PrismaClient();

// Define the function
async function createCategory(){
  try {
    // Create the new category
    const newCategory = await prisma.categories.create({
      data: {
        // name,
        name:'Math'
      },
    });
    
    // Log the created category
    console.log('Created category:', newCategory);

    return newCategory;
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);
    throw new Error('Error creating category');
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

// Call the function to create a new category
// createCategory('Math');
createCategory();
