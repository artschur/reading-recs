"use client";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Book {
  id: number;
  title: string;
  publishedYear: number;
  rating: number;
  description: string;
  numberOfRecommendations: number;
  authorId: string;
  genreName: number;
  authorName: string;
}

export default function BookIdPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`/api/books/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch book");
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [params.id]); // Run effect when book ID changes

  if (loading) return <div className="p-4">Loading book details...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!book) return <div className="p-4">Book not found</div>;

  return (
    <div className="p-4 w-full">
      <Button variant="outline" className="mb-4" onClick={() => router.back()}>
        Back to Books
      </Button>
      <section className=" flex justify-center items-center ">
        <div>
          <div className="flex flex-row mt-4">
            <h1 className="hover:shadow-lg transition-shadow duration-200 font-semibold text-3xl">
              {book.title}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <p>{book.description}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-gray-500 mr-4">Author</p>
              <p>{book.authorName}</p>
            </div>
            <div>
              <p className="text-gray-500">Genre</p>
              <p>{book.genreName}</p>
            </div>
            <div>
              <p className="text-gray-500">Published Year</p>
              <p>{book.publishedYear}</p>
            </div>
            <div>
              <p className="text-gray-500">Recommendations</p>
              <p>{book.numberOfRecommendations}</p>
            </div>
            <div>
              <p className="text-gray-500">Rating</p>
              <p>{book.rating}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
