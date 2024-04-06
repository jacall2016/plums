import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { describe } from 'node:test';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

  try {
    const { topicId, title, description, photos, notes, urls, attachments } = await req.json();

    // Create the new source
    const newSource = await prisma.sources.create({
      data: {
        topicId: topicId,
        title: title,
        description: description,
        photos: photos,
        notes: notes,
        urls: urls,
        attachments: attachments
      },
    });

    console.log('Created source:', newSource);

    // Return the newly created source
    //return newSource;
    return NextResponse.json({
      data: newSource
    },
    {
      status: 201
    });
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Error creating source',
    }, {
      status: 500,
    });
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
        // Retrieve all sources for the given topic ID
        const sourcesForTopic = await prisma.sources.findMany({
            where: {
                topicId: customKey,
            },
        });
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

export async function PUT(req: Request) {
  try {
   const { id, title, description, photos, notes, urls, attachments } = await req.json();

    // Update the source with the provided source ID
    const updatedSource = await prisma.sources.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        photos: photos,
        notes: notes,
        urls: urls,
        attachments: attachments
      },
    });

    // Log the updated source
    console.log('Updated source:', updatedSource);

    // Return the updated source
    return NextResponse.json({
      data: updatedSource
    }, {
      status: 200
    });
  } catch (error) {
    // Log any errors that occur during the update process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Error updating source'
    }, {
      status: 500
    });
  } finally {
//      Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const customKey = url.searchParams.get("sourceId");

    if (customKey === null) {
      // Handle null case, such as returning an error response
      return NextResponse.json({
        error: 'Category ID is required',
      }, {
        status: 400, // Bad Request
      });
    }


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