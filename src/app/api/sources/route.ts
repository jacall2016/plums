import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(topicId: string, title: string, photos?: string, notes?: string, urls?: string) {
  try {
    // Create the new source
    const newSource = await prisma.sources.create({
      data: {
        topicId: topicId,
        title: title,
        photos: photos,
        notes: notes,
        urls: urls,
      },
    });

    // Log the created source
    console.log('Created source:', newSource);

    // Return the newly created source
    return newSource;
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);

    // Throw an error
    throw new Error('Error creating source');
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
    try {
        // Retrieve the topicId from the URL query parameters

        const url = new URL(request.nextUrl);
        const customKey = url.searchParams.get("topicId");

        // Ensure that topicId is not empty


        // Retrieve all sources for the given topic ID
        const sourcesForTopic = await prisma.sources.findMany({
            where: {
                topicId: customKey,
            },
        });

        // Log the retrieved sources


        // Return the data in the response along with a 200 status code
        return NextResponse.json({
            data: sourcesForTopic
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

export async function PUT(sourceId: string, title?: string, photos?: string, notes?: string, urls?: string) {
  try {
    // Update the source with the provided source ID
    const updatedSource = await prisma.sources.update({
      where: {
        id: sourceId,
      },
      data: {
        title: title,
        photos: photos,
        notes: notes,
        urls: urls,
      },
    });

    // Log the updated source
    console.log('Updated source:', updatedSource);

    // Return the updated source
    return updatedSource;
  } catch (error) {
    // Log any errors that occur during the update process
    console.error('Error:', error);

    // Throw an error
    throw new Error('Error updating source');
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const customKey = url.searchParams.get("sourceId");


    // Delete the topic by its ID
    await prisma.sources.delete({
      where: {
        id: customKey,
      },
    });

    // Fetch all topics after deletion
    const topics = await prisma.sources.findMany();

    // Return a success response with the updated topics list and a 200 status code
    return NextResponse.json({
      message: 'Topic deleted successfully',
      data: topics,
    }, {
      status: 200,
    });
  } catch (error) {
    // Log any errors that occur during the deletion process
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