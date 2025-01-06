"use client";

import { SearchResults } from "@/components/searchResults";
import { useSearchParams } from "next/navigation";

function s() {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("q")?.toString() || "";
  return (
    <>
      <h1>Results for {query}</h1>
      <SearchResults search={query} />
    </>
  );
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("q")?.toString() || "";
  return (
    <div>
      <h1>Results for {query}</h1>
      <SearchResults search={query} />
    </div>
  );
}
