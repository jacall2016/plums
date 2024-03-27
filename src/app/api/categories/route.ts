import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Create the new category
    const { name } = await req.json();
    const newCategory = await prisma.categories.create({
      data: {
        name,
      },
    });

    // Log the created category
    console.log('Created category:', newCategory);

    // Return the newly created category
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    // Log any errors that occur during the creation process
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ error: 'Error creating category' }, { status: 500 });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    // Retrieve all categories
    const allCategories = await prisma.categories.findMany();

    // Log the retrieved categories
    console.log('All categories:', allCategories);

    // Return the data in the response along with a 200 status code
    return NextResponse.json({ data: allCategories }, { status: 200 });
  } catch (error) {
    // Log any errors that occur during the retrieval process
    console.error('Error:', error);

    // Return an error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    // Disconnect the Prisma client
    await prisma.$disconnect();
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.nextUrl);
    const customKey = url.searchParams.get("categoryId");

    // Delete the topic by its ID
    await prisma.categories.delete({
      where: {
        id: customKey,
      },
    });

    // Fetch all topics after deletion
    const categories = await prisma.categories.findMany();

    // Return a success response with the updated topics list and a 200 status code
    return NextResponse.json({
      message: 'Topic deleted successfully',
      data: categories,
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



