import { use } from "react";
import { getBook } from "@/app/_data/data";
import BookDetails from "@/components/bookDetailsPage";

export default function BookIdPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const book = use(getBook(Number(params.id)));
  console.log(book);
  return <BookDetails book={book} />;
}
