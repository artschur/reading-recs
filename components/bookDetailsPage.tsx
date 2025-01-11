"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Book } from "@/types";
import GoBackButton from "./ui/goBackButton";

export default function BookDetails({ book }: { book: Book }) {
  const router = useRouter();

  return (
    <div className="p-4 w-3/4">
      <GoBackButton text="Go Back" />
      <section className="flex justify-center items-center">
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
