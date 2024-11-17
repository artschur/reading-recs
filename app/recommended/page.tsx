'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IBM_Plex_Mono } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react';

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
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
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

  return (
    <div>
      <div className='p-4 ml-2 flex flex-row'>
        <ArrowUpRight />
        <h1 className={`${ibmMono700.className} text-xl ml-2 `}>Most recommended</h1>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book.id}>
            <Link href={`/books/${book.id}`} className='flex flex-col'>
              <CardHeader>
                <CardTitle>
                  {book.title}
                </CardTitle>
                <p className='text-green-700'>{book.authorName}. {book.publishedYear} </p>
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
    </div>
  );
}