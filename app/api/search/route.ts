import { booksTable, authorsTable, influencialPeopleTable, genresTable } from "@/db/schema";
import { db } from "@/db/index";
import { ilike, sql } from "drizzle-orm";

async function searchAllTables(db: any, query: string) {
  const searchResults = await db.execute(sql`
    SELECT *
    FROM books 
    WHERE title ILIKE ${`%${query}%`}

    LIMIT 50
  `);

  return searchResults;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response("Missing query parameter", { status: 400 });
  }

  const results = await searchAllTables(db, query);

  return new Response(JSON.stringify(results), {
    headers: {
      "content-type": "application/json",
    },
  });
}

export interface booksResponse extends Array<booksResponse> {
  id: number;
  title: string;
  publishedYear: number;
  genreId: number;
  rating: number;
  numberOfRecommendations: number;
  authorId: number;
  description: string;
}
