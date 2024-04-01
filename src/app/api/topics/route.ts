import { CategoryToTopic, PrismaClient, Topics } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

interface NewTopicData {
  title: string;
  description: string;
  categories: {
    create: {
      category: {
        connect: {
          id: string;
        };
      };
    }[];
  };
  parent?: {
    connect: {
      id: string;
    };
  };
}


export async function POST(req: Request) {
  try {
    // Extract form items from the request body
    const { title, categoryIds, description, parentId } = await req.json();

    // Create the new topic along with the connected categories
    const newTopicData = {
      title,
      description,
      categories: {
        create: categoryIds.map((categoryId: string) => ({
          categoryId, // Assuming your CategoryToTopic model uses categoryId
        })),
      },
      parentId, // Include parentId in the new topic data
    };

    const newTopic = await prisma.topics.create({
      data: newTopicData,
      include: {
        categories: true,
        parent: true, // Include the parent topic in the response
        children: true, // Include the children topics in the response
      },
    });

    // If parentId is valid, update the parent topic's children relation
    if (parentId) {
      console.log('Updating parent topic with id:', parentId);
    
      try {
        // Update the parent topic's children relation
        const updatedParentTopic = await prisma.topics.update({
          where: { id: parentId },
          data: {
            children: {
              connect: { id: newTopic.id }, // Connect the new child topic
            },
          },
          include: {
            children: true, // Include the updated children in the response
          },
        });
    
        console.log('Updated parent topic:', updatedParentTopic);
      } catch (error) {
        console.error('Error updating parent topic:', error);
        // Handle the error appropriately (e.g., return an error response)
      }
    } else {
      console.log('No parentId provided, skipping parent update.');
    }


    // Return the newly created topic along with its categories, parent, and children
    return NextResponse.json({
      data: newTopic,
    }, {
      status: 201,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      error: 'Error creating topic',
    }, {
      status: 500,
    });
  } finally {
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

    const deletedTopic = await prisma.topics.findUnique({
      where: {
        id: customKey as string,
      },
      include: {
        sources: true,
        categories: true,
      },
    });

    if (deletedTopic === null) {
      // Handle null case, such as returning an error response
      return NextResponse.json({
        error: 'Deleted topic not found',
      }, {
        status: 400, // Bad Request
      });
    }

    // Extract IDs from associated Sources and CategoryToTopics
    const sourceIds = deletedTopic.sources.map(source => source.id).filter(Boolean); // Filter out null or undefined IDs
    const categoryToTopicIds = deletedTopic.categories.map(cat => cat.id).filter(Boolean); 

    // Delete the topic by its ID
    await prisma.topics.delete({
      where: {
        id: customKey as string,
      },
    });

    // Create Recently_Deleted entry with associated IDs
    await prisma.recently_Deleted.create({
      data: {
        id: deletedTopic.id, // Assigning the same id as the deleted topic
        title: deletedTopic.title,
        description: deletedTopic.description as string,
        sourceIds: { set: sourceIds }, // Set the sourceIds array
        categoryToTopicIds: { set: categoryToTopicIds }, // Set the categoryToTopicIds array
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
