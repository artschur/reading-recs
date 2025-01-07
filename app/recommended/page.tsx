import MostRecommendedBooks from "@/components/mostRecommendedBooks";
import { RecommendedInfluentialPeople } from "@/components/recommendedInfluentialPeople";
import { InfluentialPerson } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Book {
  id: number;
  title: string;
  publishedYear: number;
  rating: number;
  numberOfRecommendations: number;
  description: string;
  authorName: string;
  genreName: string;
}

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
  const books = await fetchBooks();
  const people = await fetchInfluentialPeople();
  console.log(baseUrl);
  return (
    <div>
      <MostRecommendedBooks books={books} />
      <RecommendedInfluentialPeople person={people} />
    </div>
  );
}
