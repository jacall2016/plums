// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
// npx ts-node prisma/utilities/read/getAllCategories.ts

async function getCategories() {
  try {
    // Retrieve all categories
    const allCategories = await prisma.categories.findMany();

    // Log the retrieved categories
    console.log('All categories:', allCategories);

    return allCategories;
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);
    return [];
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

