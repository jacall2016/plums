import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.nextUrl);
        const customKey = url.searchParams.get("topicId");

        if (customKey === null) {
          // Handle null case, such as returning an error response
          return NextResponse.json({
            error: 'Category ID is required',
          }, {
            status: 400, // Bad Request
          });
        }
    
  
      // Update topic fields
      const categories = await prisma.categoryToTopic.findMany({
        where: {
          id: customKey,
        },
      });
      console.log(categories)
      
      // Update category relationships

  
      // Return the updated topic
      return NextResponse.json({
        data: categories
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