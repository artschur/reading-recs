// app/api/books/route.ts
import { db } from '@/db/index';
import { authorsTable, booksTable, recommendationsTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { desc, asc } from 'drizzle-orm';

export async function GET(request: Request) {
    // const recommendationsTable = db.getTable('recommendations');
    const url = new URL(request.url);
    const sort = url.searchParams.get('sortBy') || 'recommendations';  // Example: 'rating' or 'numberOfRecommendations'
    const order = url.searchParams.get('order') || 'desc';  // Example: 'asc' or 'desc'
    const limit = url.searchParams.get('limit') || '10';  // Example: '10' or '20'
    const genre = url.searchParams.get('genre');  // Example: 'Fantasy' or 'Science Fiction'


    try {
        // Build the query
        const sortColumns = {
            recommendations: sql`COUNT(${recommendationsTable.id})`,
            rating: booksTable.rating,
            publishedYear: booksTable.publishedYear,
            title: booksTable.title,
            year: booksTable.publishedYear,
        };

        // Ensure the `sortBy` parameter maps to a valid column, otherwise default to numberOfRecommendations
        const sortColumn = sortColumns[sort] || sql`COUNT(${recommendationsTable.id})`;

        const query = db
            .select({
                id: booksTable.id,
                title: booksTable.title,
                publishedYear: booksTable.publishedYear,
                rating: booksTable.rating,
                description: booksTable.description,
                numberOfRecommendations: sql`COUNT(${recommendationsTable.id})`, // Get the number of recommendations
                authorId: booksTable.authorId,
                genreId: booksTable.genreId,
                authorName: authorsTable.name, // Get author's name
            })
            .from(booksTable)
            .innerJoin(authorsTable, eq(authorsTable.id, booksTable.authorId))
            .leftJoin(recommendationsTable, eq(recommendationsTable.bookId, booksTable.id))
            .orderBy(order === 'asc' ? asc(sortColumn) : desc(sortColumn))
            .groupBy(booksTable.id, authorsTable.name);

        if (genre) {
            query.where(eq(booksTable.genreId, genre));
        }

        if (limit) {
            query.limit(parseInt(limit));
        }

        const booksWithAuthors = await query;

        return NextResponse.json(booksWithAuthors);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch books with authors' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, publishedYear, genreId, rating, numberOfRecommendations, authorId } = body;

        const newBook = await db.insert(booksTable).values({
            title,
            publishedYear,
            genreId,
            rating,
            numberOfRecommendations,
            authorId
        }).returning();

        return NextResponse.json(newBook[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
    }
}

