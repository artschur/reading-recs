import { use } from "react";
import { getBook } from "@/app/_data/data";
import BookDetails from "@/components/bookDetailsPage";

export default function BookIdPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const book = use(getBook(Number(params.id)));
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <BookDetails book={book} />
    </div>
  );
}
