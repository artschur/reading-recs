import { listBooks } from "../_data/data";
import BooksSection from "@/components/booksSection";

const books = await listBooks(0, 40);
export default function BooksPage() {
  return (
    <div className="p-8 max-w-full">
      <div className="text-2xl font-bold"> Find you next favorite book.</div>
      <div className="text-lg text-gray-500 mb-6">
        here is the list of all the books weve got registered.
      </div>
      <BooksSection books={books} />
    </div>
  );
}
