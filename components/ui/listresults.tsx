import { Book } from '@/db/interface'
import Link from 'next/link';

export function ListBookResults({ books }: any) {

    return (
        <>
            <div>
                {books.map((book: any) => (
                    <Link href={`/books/${book.id}`} key={book.id}>
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                    </Link>
                ))}
            </div>
        </>
    );
}