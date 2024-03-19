import { CategoryToTopic, PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Extract form items from the request body
    const { title, categoryIds, description } = await req.json();

    // Create the new topic along with the connected categories
    const newTopic = await prisma.topics.create({
      data: {
        title,
        description,
        categories: {
          // Connect each category with the new topic using CategoryToTopic junction table
          create: categoryIds.map((categoryId: string) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: {
        categories: true, // Include the associated categories in the response
      },
    });


    // Return the newly created topic along with associated categories
    return NextResponse.json({
      data: newTopic,
    }, {
      status: 201, // 201 Created status code
    });
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);

    // Return an error response with a 500 status code
    return NextResponse.json({
      error: 'Error creating topic',
    }, {
      status: 500,
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

export async function PUT(req: Request) {
  try {
    // Update the topic with the provided topic ID
    const {categories, description, id, title } = await req.json();

    const updatedTopic = await prisma.topics.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
      },
    });

    // Find existing CategoryToTopic entries for the provided topicId
    const existingCategoryToTopics = await prisma.categoryToTopic.findMany({
      where: {
        topicId: id,
      },
    });

    // Extract categoryIds from existingCategoryToTopics
    const existingCategoryIds = existingCategoryToTopics.map((ct) => ct.categoryId);

    // Identify categories to delete (not present in provided categories)
    const categoriesToDelete = existingCategoryToTopics.filter((ct) => {
      // Check if categoryId is not present in the provided categories array for deletion
      return !categories.some((cat : any) => cat.categoryId === ct.categoryId);
    });


    // Identify categories to add (present in provided categories but not in existingCategoryToTopics)
    const categoryIdsToAdd = categories
    .map((category : CategoryToTopic) => category.categoryId) // Extract categoryId strings
    .filter((categoryId : string) => !existingCategoryIds.includes(categoryId));


    // Delete categories not present in provided categories
    await prisma.categoryToTopic.deleteMany({
      where: {
        AND: [
          {
            topicId: id,
          },
          {
            categoryId: {
              in: categoriesToDelete.map((ct) => ct.categoryId),
            },
          },
        ],
      },
    });

    // Add categories not present in existingCategoryToTopics
    const createCategoryPromises = categoryIdsToAdd.map((categoryId : any) =>
      prisma.categoryToTopic.create({
        data: {
          categoryId,
          topicId: id,
        },
      })
    );

    await Promise.all(createCategoryPromises);
    const updatedTopics = await prisma.topics.findMany();

    // Return the updated topic
    return NextResponse.json({
      data: updatedTopics
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


export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const customKey = url.searchParams.get("topicId");

    // Delete the topic by its ID
    await prisma.topics.delete({
      where: {
        id: customKey as string,
      },
    });

    // Fetch all topics after deletion
    const topics = await prisma.topics.findMany();

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
