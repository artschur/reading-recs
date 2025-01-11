import { useEffect, useState } from "react";
import { ListBookResults } from "./ui/listresults";
import { Book } from "@/types";

interface SearchResultsProps {
  search: string;
}

export function SearchResults({ search }: SearchResultsProps) {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!search) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(search)}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        setResults(data.books || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (results.length === 0) return <p>No results found for "{search}".</p>;

  return (
    <div>
      <ListBookResults books={results} />
    </div>
  );
}
