import MostRecommendedBooks from "@/components/mostRecommendedBooks";
import { RecommendedInfluentialPeople } from "@/components/recommendedInfluentialPeople";
import { InfluentialPerson } from "@/types";
import { getBooks } from "../api/books/route";
import { Book } from "@/types";
import { Suspense } from "react";
import { getInfluentialPeople } from "../api/influential_people/route";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${baseUrl}/api/books?limit=6`, {});
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}

async function fetchInfluentialPeople(): Promise<InfluentialPerson[]> {
  try {
    const response = await fetch(`${baseUrl}/api/influential_people`, {
      next: { revalidate: 100 }, // Optional: Cache the response for 10 seconds
    });
    if (!response.ok) {
      throw new Error("Failed to fetch influential people");
    }
    const data: InfluentialPerson[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching influential people:", error);
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks(6);
  const people = await getInfluentialPeople(1);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <MostRecommendedBooks books={books} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <RecommendedInfluentialPeople person={people} />
      </Suspense>
    </>
  );
}
