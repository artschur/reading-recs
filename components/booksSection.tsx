"use client";

import { PartialBooks } from "@/types";
import { useState } from "react";
import { ListOfBooks } from "@/components/listOfBooks";
import { Book } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";

export default function BooksSection({ books }: { books: Book[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const availableGenres: string[] = [];
  books.forEach((book: Book) => {
    if (!availableGenres.includes(book.genreName)) {
      availableGenres.push(book.genreName);
    }
  });

  const filteredBooks = books.filter((book: Book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBooksByGenre = filteredBooks.filter((book: Book) =>
    book.genreName.toLowerCase().includes(genreFilter.toLowerCase()),
  );

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreSelect = (genre: string) => {
    genre === "all" ? setGenreFilter("") : setGenreFilter(genre.toLowerCase());
  };

  return (
    <div>
      <div className="flex flex-col justify-between items-center md:flex-row mb-4">
        <input
          type="text"
          placeholder="Search for a book"
          onChange={handleSearch}
          className="border border-gray-300 rounded-lg p-2"
        />
        <Select onValueChange={handleGenreSelect} defaultValue={genreFilter}>
          <SelectTrigger className="w-[180px] max-w-[300px]">
            <SelectValue>{genreFilter || "Filter by genre"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              key={"all"}
              value={"all"}
              onClick={() => handleGenreSelect("all")}
            >
              all
            </SelectItem>
            {availableGenres.map((genre: string) => (
              <SelectItem
                key={genre}
                value={genre}
                onClick={() => handleGenreSelect(genre)}
              >
                {genre.toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ListOfBooks books={filteredBooksByGenre} />
    </div>
  );
}
