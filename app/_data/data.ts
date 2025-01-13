import { db } from "@/db";
import {
  booksTable,
  recommendationsTable,
  authorsTable,
  genresTable,
  influencialPeopleTable,
  fieldsTable,
} from "@/db/schema";
import { Book, InfluentialPerson, PartialBooks } from "@/types";
import { desc, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

export async function getBook(id: number): Promise<Book> {
  const bookData = await db
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
  const book = bookData[0];
  return {
    ...book,
    numberOfRecommendations: Number(book.numberOfRecommendations), // Convert number of recommendations to number
    rating: Number(book.rating), // Convert rating to number
  };
}

export async function getBooks(limit: number) {
  return await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      publishedYear: booksTable.publishedYear,
      rating: booksTable.rating,
      description: booksTable.description,
      numberOfRecommendations: sql`COUNT(${recommendationsTable.id})::integer`,
      authorId: booksTable.authorId,
      genreName: genresTable.name,
      authorName: authorsTable.name,
    })
    .from(booksTable)
    .innerJoin(authorsTable, eq(authorsTable.id, booksTable.authorId))
    .leftJoin(
      recommendationsTable,
      eq(recommendationsTable.bookId, booksTable.id),
    )
    .innerJoin(genresTable, eq(genresTable.id, booksTable.genreId))
    .groupBy(booksTable.id, authorsTable.name, genresTable.name)
    .limit(limit);
}

export async function getInfluentialPeople(
  limit: number,
): Promise<InfluentialPerson[]> {
  const response = db
    .select({
      id: influencialPeopleTable.id,
      name: influencialPeopleTable.name,
      description: influencialPeopleTable.description,
      yearBorn: influencialPeopleTable.yearBorn,
      field: fieldsTable.name,
      occupation: influencialPeopleTable.occupation,
      profilePic: influencialPeopleTable.profilePic,
      visible: influencialPeopleTable.visible,
      recommendationsCount: sql<number>`COUNT(${recommendationsTable.id})`,
    })
    .from(influencialPeopleTable)
    .leftJoin(
      recommendationsTable,
      eq(recommendationsTable.influencerId, influencialPeopleTable.id),
    )
    .leftJoin(
      fieldsTable,
      eq(fieldsTable.id, influencialPeopleTable.influentialField_Id),
    )
    .groupBy(influencialPeopleTable.id, fieldsTable.name)
    .limit(limit);

  return response;
}

export async function getInfluentialPerson(id: number) {
  const response = await db
    .select({
      id: influencialPeopleTable.id,
      name: influencialPeopleTable.name,
      description: influencialPeopleTable.description,
      yearBorn: influencialPeopleTable.yearBorn,
      field: fieldsTable.name,
      occupation: influencialPeopleTable.occupation,
      profilePic: influencialPeopleTable.profilePic,
      visible: influencialPeopleTable.visible,
      recommendationsCount: sql<number>`COUNT(${recommendationsTable.id})`,
    })
    .from(influencialPeopleTable)
    .leftJoin(
      recommendationsTable,
      eq(recommendationsTable.influencerId, influencialPeopleTable.id),
    )
    .leftJoin(
      fieldsTable,
      eq(fieldsTable.id, influencialPeopleTable.influentialField_Id),
    )
    .where(eq(influencialPeopleTable.id, id))
    .groupBy(influencialPeopleTable.id, fieldsTable.name);

  return response[0];
}

export async function listBooks(
  page: number,
  limit: number,
  sort?: string,
  search?: string,
): Promise<Book[]> {
  let query = db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      rating: booksTable.rating,
      description: booksTable.description,
      genreName: genresTable.name,
      numberOfRecommendations: sql`COUNT(${recommendationsTable.id})::integer`,
      authorName: authorsTable.name,
      publishedYear: booksTable.publishedYear,
    })
    .from(booksTable)
    .innerJoin(authorsTable, eq(authorsTable.id, booksTable.authorId))
    .innerJoin(genresTable, eq(genresTable.id, booksTable.genreId))
    .leftJoin(
      recommendationsTable,
      eq(recommendationsTable.bookId, booksTable.id),
    )
    .groupBy(booksTable.id, authorsTable.name, genresTable.id) // Add groupBy clause
    .offset(page * limit)
    .limit(limit);

  if (search) {
    query.where(
      sql`LOWER(${booksTable.title}) LIKE LOWER(${"%" + search + "%"})`,
    );
  }

  const results = await query;

  return results.map((book) => ({
    ...book,
    rating: Number(book.rating),
    numberOfRecommendations: Number(book.numberOfRecommendations),
  }));
}
