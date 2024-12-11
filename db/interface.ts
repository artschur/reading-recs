export interface Book {
    id: number;
    title: string;
    publishedYear: number;
    genre: number;
    rating: number;
    numberOfRecommendations: number;
    authorId: number;
    description: string | null;
}