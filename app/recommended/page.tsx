// app/books/page.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import the font using the built-in @next/font package
import { IBM_Plex_Mono } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react';

// Load the font with a specific subset
const ibmMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'] });
const ibmMono700 = IBM_Plex_Mono({ subsets: ['latin'], weight: '700' });


interface Book {
  id: number;
  title: string;
  publishedYear: number;
  rating: number;
  numberOfRecommendations: number;
  description: string;
  authorName: string;
}



export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]); //   this sets an arrau of books, and setbooks to change it. 
  // States are something that can reload and change without refreshing the page \ setting the type of books to be an array of Book objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() { //fetching the books from the api
      try {
        const response = await fetch('/api/books?sortBy=numberOfRecommendations&order=desc');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <div className="p-4">Loading books...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  console.log(books)

  return (
    <div>
        <div className='p-4 ml-2 flex flex-row'>
        <ArrowUpRight />
        <h1 className={`${ibmMono700.className} text-xl ml-2 `}>Most recommended</h1>
        </div>
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <Card key={book.id} className="hover:shadow-lg transition-shadow duration-200">
          <Link href={`/books/${book.id}`}>
            <CardHeader>
              <CardTitle className="font-semibold text-green-600 hover:text-green-800 cursor-pointer">
                {book.title}
              </CardTitle>
              <p>{book.authorName}. {book.publishedYear} </p>
            </CardHeader>
            <CardContent>
                <p className='mb-4'>{book.description}</p>
              <p>Rating: {book.rating}/5</p>
              <p>Recommendations: {book.numberOfRecommendations}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
    </div>
  );
}
