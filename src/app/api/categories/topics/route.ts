import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // Retrieve the topicId from the URL query parameters

        const url = new URL(request.nextUrl);
        const customKey = url.searchParams.get("categoryId");

        // Ensure that topicId is not empty


        // Retrieve all sources for the given topic ID
        const sourcesForTopic = await prisma.topics.findMany({
            where: {
                categoryIds: customKey,
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