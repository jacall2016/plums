import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Extract form items from the request body
    const { title, categoryIds, description } = await req.json();
    console.log(categoryIds)

    // Create the new topic
    const newTopic = await prisma.topics.create({
      data: {
        // Map categoryIds to connect each category with the new topic
        categories: {
          connect: categoryIds.map((categoryId: string) => ({ id: categoryId })),
        },
        title,
        description,
      },
    });
    
    // Log the created topic
    console.log('Created topic:', newTopic);

    // Return the newly created topic
    return NextResponse.json({
      data: newTopic
    }, {
      status: 201 // 201 Created status code
    });
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Error creating topic'
    }, {
      status: 500
    });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}



export async function GET() {
  try {
    // Retrieve all topics
    const allTopics = await prisma.topics.findMany();

    // Log the retrieved topics
    console.log('All topics:', allTopics);

    // Return the data in the response along with a 200 status code
    return NextResponse.json({
      data: allTopics
    }, {
      status: 200
    });
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Internal Server Error'
    }, {
      status: 500
    });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function PUT(topicId: string, title: string, description?: string) {
  try {
    // Update the topic with the provided topic ID
    const updatedTopic = await prisma.topics.update({
      where: {
        id: topicId,
      },
      data: {
        title,
        description,
      },
    });

    // Log the updated topic
    console.log('Updated topic:', updatedTopic);

    // Return the updated topic
    return NextResponse.json({
      data: updatedTopic
    }, {
      status: 200
    });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Error updating topic'
    }, {
      status: 500
    });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function DELETE(topicId: string) {
  try {
    // Delete the topic by its ID
    await prisma.topics.delete({
      where: {
        id: topicId,
      },
    });

    // Return a success response with a 204 status code (no content)
    return NextResponse.json({
      message: 'Topic deleted successfully',
    }, {
      status: 204
    });
  } catch (error) {
    // Log any errors that occur during the deletion process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Internal Server Error'
    }, {
      status: 500
    });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}
