import { Book } from "@/types";
import Link from "next/link";

export function ListBookResults({ books }: any) {
  return (
    <>
      <div>
        {books.map((book: Book) => (
          <Link href={`/books/${book.id}`} key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
