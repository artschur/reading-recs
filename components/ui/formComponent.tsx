"use client";

import { useState, FormEvent } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm.trim()) return;
        const searchPath = `/results?q=${encodeURIComponent(searchTerm)}`;
        router.push(searchPath);
    };

    return (
        <form onSubmit={handleSubmit} className="w-5/12" >
            <input
                type="text"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search"
                placeholder="Search for a book, author, or genre" className="border-2 w-full border-gray-300 p-2 rounded-lg" />
        </form>
    )
}