"use client";

import { SearchResults } from "@/components/searchResults";
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";

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

    return (
        <div>
            <Suspense>
                <SearchResults />
            </Suspense>
        </div>
    );
}