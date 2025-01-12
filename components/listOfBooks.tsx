"use-server";

import { listBooks } from "@/app/_data/data";
import { Book } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function ListOfBooks() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("");

  const books = listBooks(page, limit, sort, search);
  //   return (
  //     <>
  //       <div>
  //         {books.map((book: Book) => (
  //           <Link href={`/books/${book.id}`} key={book.id}>
  //             <h3>{book.title}</h3>
  //             <p>{book.description}</p>
  //           </Link>
  //         ))}
  //       </div>
  //     </>
  //   );
  // }
}