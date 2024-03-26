import { Recently_Deleted, PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();



export async function GET() {
  try {
    // Retrieve all topics
    const allTopics = await prisma.recently_Deleted.findMany();

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


export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const customKey = url.searchParams.get("topicId");
    console.log(customKey)

    // Fetch the Recently_Deleted entry including associated IDs
    const deletedTopic = await prisma.recently_Deleted.findUnique({
        where: {
          id: customKey as string,
        },
      });
  
      if (!deletedTopic) {
        return NextResponse.json({
          error: 'Topic not found in Recently_Deleted',
        }, {
          status: 404,
        });
      }
      const sourceIds = deletedTopic.sourceIds; // Assuming sourceIds is an array field in Recently_Deleted
      const categoryToTopicIds = deletedTopic.categoryToTopicIds;
  
      // Recreate the topic with updated connections
      const recreatedTopic = await prisma.topics.create({
        data: {
          id: deletedTopic.id, // Assigning the same id as the deleted topic
          title: deletedTopic.title,
          description: deletedTopic.description as string,
          // Add other relevant fields here
          sources: { connect: sourceIds.map(id => ({ id })) }, // Connect sources using IDs
          categories: { connect: categoryToTopicIds.map(id => ({ id })) }, // Connect categories using IDs
        },
      });
  
      // Delete the Recently_Deleted entry
      await prisma.recently_Deleted.delete({
        where: {
          id: customKey as string,
        },
      });

    // Fetch all topics after deletion
    const topics = await prisma.recently_Deleted.findMany();

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


export async function DELETE(request: NextRequest) {
    try {
      const url = new URL(request.nextUrl);
      const customKey = url.searchParams.get("topicId");
  
      // Delete the topic by its ID
      const deletedTopic = await prisma.recently_Deleted.findUnique({
        where: {
          id: customKey as string,
        },
      });
  
      if (!deletedTopic) {
        return NextResponse.json({
          error: 'Topic not found',
        }, {
          status: 404,
        });
      }

      const sourceIds = deletedTopic.sourceIds; // Assuming sourceIds is an array field in Recently_Deleted
      const categoryToTopicIds = deletedTopic.categoryToTopicIds;
  
      // Delete associated Sources
      await Promise.all(
        sourceIds.map(async (sourceId) => {
          await prisma.sources.delete({
            where: {
              id: sourceId,
            },
          });
        })
      );
  
      // Delete associated CategoryToTopics
      await Promise.all(
        categoryToTopicIds.map(async (categoryToTopicId) => {
          await prisma.categoryToTopic.delete({
            where: {
              id: categoryToTopicId,
            },
          });
        })
      );
  
      // Delete the topic from RecentlyDeleted
      await prisma.recently_Deleted.delete({
        where: {
          id: customKey as string,
        },
      });
      // Fetch all topics after deletion
      const topics = await prisma.recently_Deleted.findMany();
  
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
