// app/api/books/[id]/route.ts

import { db } from "@/db/index";
import {
  booksTable,
  authorsTable,
  genresTable,
  recommendationsTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function getBook(id: number) {
  return await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      publishedYear: booksTable.publishedYear,
      rating: booksTable.rating,
      description: booksTable.description,
      numberOfRecommendations: sql`COUNT(DISTINCT ${recommendationsTable.id})`,
      authorName: authorsTable.name,
      genreName: genresTable.name,
    })
    .from(booksTable)
    .innerJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .innerJoin(genresTable, eq(booksTable.genreId, genresTable.id))
    .leftJoin(
      recommendationsTable,
      eq(recommendationsTable.bookId, booksTable.id),
    )
    .where(eq(booksTable.id, id))
    .groupBy(booksTable.id, authorsTable.name, genresTable.name);
}

export async function GET(
  request: Request,
  props: { params: Promise<{ id: number }> },
) {
  const params = await props.params;
  try {
    // Select the book details, including the count of recommendations
    const book = await db
      .select({
        id: booksTable.id,
        title: booksTable.title,
        publishedYear: booksTable.publishedYear,
        rating: booksTable.rating,
        description: booksTable.description,
        numberOfRecommendations: sql`COUNT(DISTINCT ${recommendationsTable.id})`, // Ensure unique recommendations are counted
        authorName: authorsTable.name,
        genreName: genresTable.name,
      })
      .from(booksTable)
      .innerJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
      .innerJoin(genresTable, eq(booksTable.genreId, genresTable.id))
      .leftJoin(
        recommendationsTable,
        eq(recommendationsTable.bookId, booksTable.id),
      )
      .where(eq(booksTable.id, params.id))
      .groupBy(booksTable.id, authorsTable.name, genresTable.name);

    // Check if the book was found
    if (book.length === 0) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book[0]); // Return the book details
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 },
    );
  }
}
