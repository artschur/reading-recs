"use client";

import { SearchResults } from "@/components/searchResults";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Remove the unused 's' function if it's not needed

function Results() {
  const searchParams = useSearchParams();
  const query: string = searchParams.get("q")?.toString() || "";

  return (
    <div>
      <h1>Results for {query}</h1>
      <SearchResults search={query} />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Results />
    </Suspense>
  );
}
