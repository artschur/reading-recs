import { use } from "react";
import { getBook } from "@/app/_data/data";
import BookDetails from "@/components/bookDetailsPage";

export default function BookIdPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  // const bookTest = {
  //   publishedYear: 1937,
  //   rating: 4.5,
  //   description:
  //     "The Hobbit is a fantasy novel by J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
  //   numberOfRecommendations: 5,
  //   authorName: "J. R. R. Tolkien",
  //   genreName: "Fantasy",
  //   id: 1,
  //   title: "The Hobbit",
  // }; mockdata for local dev
  const book = use(getBook(Number(params.id)));
  return (
    <div className="min-h-screen p-4 w-full flex items-center justify-center overflow-y-auto">
      <BookDetails book={book} />
    </div>
  );
}
