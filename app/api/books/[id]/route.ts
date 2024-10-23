// app/api/books/[id]/route.ts

import { db } from '@/db/index';
import { booksTable, authorsTable, genresTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const book = await db
            .select({
                id: booksTable.id,
                title: booksTable.title,
                publishedYear: booksTable.publishedYear,
                rating: booksTable.rating,
                description: booksTable.description,
                numberOfRecommendations: booksTable.numberOfRecommendations,
                authorName: authorsTable.name, // Fixed the typo here from "authroName"
                genreName: genresTable.name
            })
            .from(booksTable)
            .innerJoin(authorsTable, eq(booksTable.authorId, authorsTable.id)) // Join with authors table
            .innerJoin(genresTable, eq(booksTable.genreId, genresTable.id)) // Join with genres table
            .where(eq(booksTable.id, params.id)); // Filter by book ID

        if (!book[0]) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json(book[0]); // Return the found book details
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
    }
}