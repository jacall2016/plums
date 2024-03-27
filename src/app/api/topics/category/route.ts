import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Retrieve the categoryId from the URL query parameters
    const url = new URL(request.nextUrl);
    const customKey = url.searchParams.get("categoryId");

    if (customKey === null) {
      // Handle null case, such as returning an error response
      return NextResponse.json({
        error: 'Category ID is required',
      }, {
        status: 400, // Bad Request
      });
    }

    // Ensure that customKey is not empty
    const topicIds = await prisma.categoryToTopic.findMany({
      where: {
        categoryId: customKey as string,
      },
      select: {
        topicId: true,
      },
    });

    const extractedTopicIds = topicIds
      .filter((item) => item.topicId !== null && item.topicId !== undefined) // Filter out null or undefined topicIds
      .map((item) => item.topicId as string); // Cast topicId to string

    // Use the extracted topicIds array to fetch topics
    const topics = await Promise.all(
      extractedTopicIds.map(async (topicId) => {
        const topic = await prisma.topics.findUnique({
          where: {
            id: topicId,
          },
          // Add other selection fields as needed
        });
        return topic;
      })
    );

    // Return the data in the response along with a 200 status code
    return NextResponse.json({
      data: topics,
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
