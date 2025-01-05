// MostRecommendedBooks.tsx
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { IBM_Plex_Mono } from "next/font/google";

// Initialize the font
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400" });

interface Book {
  id: number;
  title: string;
  publishedYear: number;
  rating: number;
  description: string;
  numberOfRecommendations: number;
  authorName: string;
  genreName: string;
}

interface MostRecommendedBooksProps {
  books: Book[];
}

export default function MostRecommendedBooks({
  books,
}: MostRecommendedBooksProps) {
  return (
    <>
      <div className="p-4 mt-4 ml-2 flex flex-row items-center">
        <ArrowUpRight />
        <h1 className={`${ibmPlexMono.className} text-xl ml-2`}>
          Most Recommended
        </h1>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book.id}>
            <Link href={`/books/${book.id}`} className="flex flex-col">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <p className="text-green-700">
                  {book.authorName}. {book.publishedYear}
                </p>
              </CardHeader>
              <CardContent>
                <p>{book.description}</p>
              </CardContent>
              <CardFooter>
                <p>Rating: {book.rating}/5</p>
                <p>Recommendations: {book.numberOfRecommendations}</p>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
