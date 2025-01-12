import MostRecommendedBooks from "@/components/mostRecommendedBooks";
import { RecommendedInfluentialPeople } from "@/components/recommendedInfluentialPeople";
import { getBooks, getInfluentialPeople } from "../_data/data";

export default async function BooksPage() {
  const books = await getBooks(6);
  const newBooks = books.map((book) => ({
    ...book,
    rating: Number(book.rating),
    numberOfRecommendations: Number(book.numberOfRecommendations),
  }));
  const people = await getInfluentialPeople(6);

  return (
    <>
      <MostRecommendedBooks books={newBooks} />
      <RecommendedInfluentialPeople people={people} />
    </>
  );
}
