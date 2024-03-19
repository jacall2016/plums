import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Retrieve the topicId from the URL query parameters
    const url = new URL(request.nextUrl);
    const topicId = url.searchParams.get('topicId');

    // Ensure that topicId is not empty
    if (!topicId) {
      throw new Error('Topic ID is missing');
    }

    // Retrieve all categories associated with the given topic ID
    const categories = await prisma.categoryToTopic.findMany({
      where: {
        topicId,
      },
      include: {
        category: true,
      },
    });

    // Log the retrieved categories
    console.log('Retrieved categories:', categories);

    // Return the data in the response along with a 200 status code
    return NextResponse.json({
      data: categories,
    }, {
      status: 200,
    });
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Internal Server Error',
    }, {
      status: 500,
    });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}